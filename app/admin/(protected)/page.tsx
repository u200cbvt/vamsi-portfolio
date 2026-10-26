import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
export default async function Dashboard() {
  const s = await requireAdmin();
  const count = async (col: string, val: string | boolean) =>
    (await s.from("projects").select("id", { count: "exact", head: true }).eq(col, val)).count ?? 0;
  const [published, draft, featured] = await Promise.all([count("status", "published"), count("status", "draft"), count("featured", true)]);
  return (
    <>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {[["Published", published], ["Drafts", draft], ["Featured", featured]].map(([l, n]) => (
          <div key={l as string} className="rounded-lg border border-line bg-panel p-5"><dt className="text-mute">{l}</dt><dd className="mt-1 text-3xl">{n}</dd></div>
        ))}
      </dl>
      <Link href="/admin/projects/new" className="mt-8 inline-block rounded bg-accent px-5 py-3 font-medium text-ink">Add project</Link>
    </>
  );
}
