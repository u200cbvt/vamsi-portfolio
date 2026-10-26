import { createClient } from "@supabase/supabase-js";
export type Project = {
  id: string; slug: string; title: string; summary: string | null; description: string | null;
  category: string | null; tools: string[] | null; thumbnail_url: string | null;
  business_problem: string | null; methodology: string | null; key_findings: string | null;
  limitations: string | null; github_url: string | null; live_url: string | null; featured: boolean;
};
function db() {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL, k = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return u && k ? createClient(u, k, { auth: { persistSession: false } }) : null;
}
// RLS lets the anon key read published rows only; the status filter is a second guard.
export async function getProjects(): Promise<{ projects: Project[]; error: string | null }> {
  const c = db();
  if (!c) return { projects: [], error: null };
  const { data, error } = await c.from("projects").select("*").eq("status", "published")
    .order("featured", { ascending: false }).order("sort_order").order("published_at", { ascending: false });
  return { projects: (data as Project[]) ?? [], error: error ? "Projects could not be loaded." : null };
}
export async function getProject(slug: string): Promise<Project | null> {
  const c = db();
  if (!c) return null;
  const { data } = await c.from("projects").select("*").eq("status", "published").eq("slug", slug).maybeSingle();
  return (data as Project) ?? null;
}
