import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { saveProject, deleteProject } from "../../../actions";
import DeleteButton from "@/components/DeleteButton";
const text = [["summary", "Short summary"], ["description", "Overview"], ["business_problem", "Business problem"], ["methodology", "Methodology"], ["key_findings", "Key findings"], ["limitations", "Limitations"]] as const;
const inp = "mt-1 w-full rounded border border-line bg-panel px-3 py-2";
export default async function EditProject({ params, searchParams }: { params: { id: string }; searchParams: { error?: string } }) {
  const s = await requireAdmin();
  const isNew = params.id === "new";
  const p: Record<string, any> = isNew ? {} : (await s.from("projects").select("*").eq("id", params.id).maybeSingle()).data ?? notFound();
  return (
    <>
      <h1 className="font-display text-3xl">{isNew ? "Add project" : "Edit project"}</h1>
      {searchParams.error && <p role="alert" className="mt-4 rounded border border-red-400/60 p-3 text-red-300">{searchParams.error}</p>}
      <p className="mt-2 text-mute">Only the title is required. Anything you leave blank simply will not appear on the website. Your GitHub repositories already show up automatically; add a project here only to write a full case study.</p>
      <form action={saveProject} className="mt-6 space-y-4">
        {!isNew && <input type="hidden" name="id" value={p.id} />}
        <label className="block">Title (required)<input name="title" required defaultValue={p.title ?? ""} className={inp} /></label>
        <label className="block">URL slug (optional, made from the title if empty)<input name="slug" defaultValue={p.slug ?? ""} className={inp} /></label>
        <label className="block">Category<input name="category" defaultValue={p.category ?? ""} placeholder="SQL, Power BI, EDA…" className={inp} /></label>
        <label className="block">Tools (comma separated)<input name="tools" defaultValue={(p.tools ?? []).join(", ")} className={inp} /></label>
        {text.map(([k, l]) => <label key={k} className="block">{l}<textarea name={k} rows={k === "summary" ? 2 : 4} defaultValue={p[k] ?? ""} className={inp} /></label>)}
        <label className="block">GitHub URL<input name="github_url" type="url" defaultValue={p.github_url ?? ""} className={inp} /></label>
        <label className="block">Live demo URL<input name="live_url" type="url" defaultValue={p.live_url ?? ""} className={inp} /></label>
        <label className="block">Thumbnail (JPG, PNG or WebP, max 2 MB)<input name="thumbnail" type="file" accept="image/jpeg,image/png,image/webp" className={inp} /></label>
        {p.thumbnail_url && <img src={p.thumbnail_url} alt="Current thumbnail" className="h-24 rounded" />}
        <div className="flex flex-wrap items-end gap-6">
          <label>Status<select name="status" defaultValue={p.status ?? "draft"} className={inp}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label>Sort order<input name="sort_order" type="number" defaultValue={p.sort_order ?? 0} className={inp} /></label>
          <label className="flex items-center gap-2"><input name="featured" type="checkbox" defaultChecked={!!p.featured} />Featured</label>
        </div>
        <button className="rounded bg-accent px-5 py-3 font-medium text-ink">Save</button>
      </form>
      {!isNew && <div className="mt-10 border-t border-line pt-6"><DeleteButton action={deleteProject.bind(null, p.id)} /></div>}
    </>
  );
}
