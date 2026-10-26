import Link from "next/link";
import type { Project } from "@/lib/projects";
export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="rounded-lg border border-line bg-panel p-5">
      {p.thumbnail_url && <img src={p.thumbnail_url} alt={`${p.title} preview`} loading="lazy" className="mb-4 aspect-video w-full rounded object-cover" />}
      <p className="text-sm text-mute">{p.category}{p.featured ? " · Featured" : ""}</p>
      <h3 className="mt-1 font-display text-xl"><Link href={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link></h3>
      {p.summary && <p className="mt-2 text-mute">{p.summary}</p>}
      {p.tools && p.tools.length > 0 && <p className="mt-3 text-sm text-paper/80">{p.tools.join(", ")}</p>}
    </article>
  );
}
