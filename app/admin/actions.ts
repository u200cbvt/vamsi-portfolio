"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

const fail = (to: string, msg: string): never => redirect(`${to}?error=${encodeURIComponent(msg)}`);
const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim() || null;

export async function signIn(f: FormData) {
  const { error } = await supabaseServer().auth.signInWithPassword({ email: String(f.get("email") ?? ""), password: String(f.get("password") ?? "") });
  if (error) fail("/admin/login", "Invalid email or password.");
  redirect("/admin");
}
export async function signOut() { await supabaseServer().auth.signOut(); redirect("/admin/login"); }

export async function saveProject(f: FormData) {
  const s = await requireAdmin();
  const id = str(f, "id");
  const back = `/admin/projects/${id ?? "new"}`;
  const title = str(f, "title"), slug = str(f, "slug");
  if (!title) fail(back, "Title is required.");
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) fail(back, "Slug must use lowercase letters, numbers and hyphens only.");
  for (const k of ["github_url", "live_url"]) { const v = str(f, k); if (v && !/^https?:\/\//.test(v)) fail(back, `${k.replace("_", " ")} must start with http:// or https://`); }
  const status = str(f, "status") ?? "draft";
  if (!["draft", "published", "archived"].includes(status)) fail(back, "Invalid status.");

  let thumbnail_url: string | undefined;
  const file = f.get("thumbnail");
  if (file instanceof File && file.size > 0) {
    const ext = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as Record<string, string>)[file.type];
    if (!ext) fail(back, "Thumbnail must be a JPG, PNG or WebP image.");
    if (file.size > 2 * 1024 * 1024) fail(back, "Thumbnail must be under 2 MB.");
    const path = `projects/${crypto.randomUUID()}.${ext}`;
    const up = await s.storage.from("public-assets").upload(path, file, { contentType: file.type });
    if (up.error) fail(back, "Image upload failed, so nothing was saved. Please try again.");
    thumbnail_url = s.storage.from("public-assets").getPublicUrl(path).data.publicUrl;
  }
  const existing = id ? (await s.from("projects").select("published_at").eq("id", id).maybeSingle()).data : null;
  const row = {
    slug, title, summary: str(f, "summary"), description: str(f, "description"), category: str(f, "category"),
    tools: (str(f, "tools") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    business_problem: str(f, "business_problem"), methodology: str(f, "methodology"), key_findings: str(f, "key_findings"),
    limitations: str(f, "limitations"), github_url: str(f, "github_url"), live_url: str(f, "live_url"),
    status, featured: f.get("featured") === "on", sort_order: Number(f.get("sort_order") ?? 0) || 0,
    published_at: status === "published" ? existing?.published_at ?? new Date().toISOString() : null,
    updated_at: new Date().toISOString(), ...(thumbnail_url ? { thumbnail_url } : {}),
  };
  const { error } = id ? await s.from("projects").update(row).eq("id", id) : await s.from("projects").insert(row);
  if (error) fail(back, error.code === "23505" ? "That slug is already used by another project." : "Could not save the project.");
  revalidatePath("/"); revalidatePath("/projects");
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(id: string) {
  const s = await requireAdmin();
  const { error } = await s.from("projects").delete().eq("id", id);
  if (error) fail("/admin/projects", "Could not delete the project.");
  revalidatePath("/projects");
  redirect("/admin/projects?saved=1");
}
