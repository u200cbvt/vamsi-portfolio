"use client";
import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { TAGS, type Item } from "@/lib/portfolio";
import Icon from "./Icons";
export default function ProjectExplorer({ items, error }: { items: Item[]; error?: string | null }) {
  const [q, setQ] = useState(""), [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...TAGS.filter((t) => items.some((i) => i.tags.includes(t)))], [items]);
  const list = items.filter((i) => (tag === "All" || i.tags.includes(tag)) && (!q.trim() || `${i.title} ${i.summary} ${i.tags.join(" ")} ${i.tools.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase())));
  const reset = () => { setQ(""); setTag("All"); };
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">{tags.map((t) => <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)} className="pill">{t}</button>)}</div>
        <label className="relative block md:w-72"><span className="sr-only">Search projects</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mute"><Icon name="search" className="h-4 w-4" /></span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="h-11 w-full rounded-lg border border-line bg-panel pl-9 pr-3 outline-none transition focus:border-accent" /></label>
      </div>
      {error && <p role="alert" className="mt-4 text-mute">{error}</p>}
      <p aria-live="polite" className="mt-4 text-sm text-mute">{list.length} {list.length === 1 ? "project" : "projects"}</p>
      {list.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-line p-10 text-center"><p>No projects match that search.</p><button type="button" onClick={reset} className="btn mt-4 border border-line hover:border-accent">Clear search and filters</button></div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProjectCard key={p.key} p={p} />)}</div>
      )}
    </div>
  );
}
