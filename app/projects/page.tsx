import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
export const metadata: Metadata = { title: "Projects", description: "Data analysis projects by Vamsi." };
export const dynamic = "force-dynamic";
export default async function Projects({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const { projects, error } = await getProjects();
  const cats = Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[];
  const q = (searchParams.q ?? "").toLowerCase();
  const list = projects.filter((p) => (!searchParams.category || p.category === searchParams.category) &&
    (!q || `${p.title} ${p.summary ?? ""} ${(p.tools ?? []).join(" ")}`.toLowerCase().includes(q)));
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-4xl">Projects</h1>
      <form className="mt-6 flex flex-wrap gap-3" role="search">
        <label className="sr-only" htmlFor="q">Search projects</label>
        <input id="q" name="q" defaultValue={searchParams.q} placeholder="Search projects" className="rounded border border-line bg-panel px-3 py-2" />
        <label className="sr-only" htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue={searchParams.category ?? ""} className="rounded border border-line bg-panel px-3 py-2">
          <option value="">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="rounded bg-accent px-4 py-2 font-medium text-ink">Apply</button>
      </form>
      {error && <p role="alert" className="mt-6 text-mute">{error} Try again in a moment.</p>}
      {!error && list.length === 0 && <p className="mt-10 text-mute">{projects.length === 0 ? "Projects will appear here once they are published." : "No projects match your search."}</p>}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </div>
  );
}
