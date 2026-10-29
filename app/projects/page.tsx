import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { getRepos } from "@/lib/github";
import { buildItems } from "@/lib/portfolio";
import ProjectExplorer from "@/components/ProjectExplorer";
export const metadata: Metadata = { title: "Projects", description: "Data analysis projects by Vamsi Bodigadla: SQL, Python, Power BI and EDA." };
export const revalidate = 60;
export default async function Projects() {
  const [{ projects, error }, repos] = await Promise.all([getProjects(), getRepos()]);
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 mb-8 max-w-2xl text-mute">Practical projects built with real data. Search or filter, then open a card for the full case study.</p>
      <ProjectExplorer items={buildItems(projects, repos)} error={error} />
    </div>
  );
}
