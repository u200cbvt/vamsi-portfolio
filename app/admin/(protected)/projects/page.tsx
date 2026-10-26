import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
export default async function AdminProjects({ searchParams }: { searchParams: { error?: string; saved?: string; status?: string } }) {
  const s = await requireAdmin();
  let q = s.from("projects").select("id,title,slug,status,featured,category").order("sort_order").order("created_at", { ascending: false });
  if (searchParams.status) q = q.eq("status", searchParams.status);
  const { data, error } = await q;
  return (
    <>
      <div className="flex items-center justify-between"><h1 className="font-display text-3xl">Projects</h1><Link href="/admin/projects/new" className="rounded bg-accent px-4 py-2 font-medium text-ink">Add project</Link></div>
      <p className="mt-3 flex gap-4 text-sm text-mute"><Link href="/admin/projects">All</Link><Link href="?status=published">Published</Link><Link href="?status=draft">Drafts</Link><Link href="?status=archived">Archived</Link></p>
      {searchParams.saved && <p role="status" className="mt-4 rounded border border-accent/60 p-3">Saved.</p>}
      {(searchParams.error || error) && <p role="alert" className="mt-4 rounded border border-red-400/60 p-3 text-red-300">{searchParams.error ?? "Could not load projects."}</p>}
      {data && data.length === 0 && <p className="mt-8 text-mute">No projects yet. Add your first one.</p>}
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        {data?.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
            <div><Link className="font-medium hover:text-accent" href={`/admin/projects/${p.id}`}>{p.title}</Link><p className="text-sm text-mute">/{p.slug} · {p.status}{p.featured ? " · featured" : ""}</p></div>
            {p.status === "published" && <Link className="text-sm text-accent" href={`/projects/${p.slug}`}>View live</Link>}
          </li>
        ))}
      </ul>
    </>
  );
}
