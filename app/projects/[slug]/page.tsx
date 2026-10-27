import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProject(params.slug);
  return p ? { title: p.title, description: p.summary ?? undefined } : { title: "Project not found" };
}
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const p = await getProject(params.slug);
  if (!p) notFound();
  const sections: [string, string | null][] = [["Business problem", p.business_problem], ["Overview", p.description], ["Methodology", p.methodology], ["Key findings", p.key_findings], ["Limitations", p.limitations]];
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-mute">{p.category}</p>
      <h1 className="mt-2 font-display text-4xl">{p.title}</h1>
      {p.summary && <p className="mt-4 text-lg text-mute">{p.summary}</p>}
      {p.tools && p.tools.length > 0 && <p className="mt-4">Tools: {p.tools.join(", ")}</p>}
      <p className="mt-4 flex gap-4">
        {p.github_url && <a className="text-accent underline" href={p.github_url}>Source code</a>}
        {p.live_url && <a className="text-accent underline" href={p.live_url}>Live demo</a>}
      </p>
      {sections.filter(([, v]) => v).map(([h, v]) => (
        <section key={h} className="mt-10"><h2 className="font-display text-2xl">{h}</h2><p className="mt-3 whitespace-pre-line leading-relaxed text-paper/85">{v}</p></section>
      ))}
    </article>
  );
}
