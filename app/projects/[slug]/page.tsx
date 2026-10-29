import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { getRepos } from "@/lib/github";
import { cases } from "@/lib/portfolio";
import Thumb from "@/components/Thumb";
import Icon from "@/components/Icons";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = cases.find((x) => x.slug === params.slug);
  if (c) return { title: c.title, description: c.summary };
  const p = await getProject(params.slug);
  return p ? { title: p.title, description: p.summary ?? undefined } : { title: "Project not found" };
}
const Block = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="mt-10"><h2 className="text-xl font-semibold">{title}</h2><div className="mt-3 leading-relaxed text-mute">{children}</div></section>;
const Back = () => <Link href="/#projects" className="ulink text-sm text-accent">← Back to projects</Link>;
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const c = cases.find((x) => x.slug === params.slug);
  if (c) {
    const repos = await getRepos();
    const repo = c.repoMatch ? repos.find((r) => r.name.toLowerCase().includes(c.repoMatch!)) : undefined;
    const next = cases[(cases.indexOf(c) + 1) % cases.length];
    return (
      <article className="mx-auto max-w-4xl px-5 py-12">
        <Back />
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{c.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-mute">{c.summary}</p>
        <p className="mt-4 flex flex-wrap gap-2">{c.tags.map((t) => <span key={t} className="rounded-md bg-raised px-2 py-1 text-sm text-accent">{t}</span>)}</p>
        {repo && <p className="mt-4"><a href={repo.url} target="_blank" rel="noopener noreferrer" className="btn border border-line hover:border-accent"><Icon name="github" className="h-5 w-5" />View repository</a></p>}
        <Thumb art={`${c.title} | ${c.summary}`} className="mt-8 border border-line" />
        <p className="mt-2 text-xs text-mute">Representative illustration of the kind of work in this project, not a screenshot.</p>
        <Block title="Business question">{c.objective}</Block>
        {c.dataset && <Block title="Dataset">{c.dataset}</Block>}
        <Block title="Process"><ol className="list-decimal space-y-2 pl-5">{c.process.map((s) => <li key={s}>{s}</li>)}</ol></Block>
        {c.deliverables && <Block title="Deliverables"><ul className="list-disc space-y-1 pl-5">{c.deliverables.map((s) => <li key={s}>{s}</li>)}</ul></Block>}
        <Block title="Tools used"><p className="flex flex-wrap gap-2">{c.tools.map((t) => <span key={t} className="chip text-sm">{t}</span>)}</p></Block>
        <nav aria-label="Next project" className="mt-12 border-t border-line pt-6"><Link href={`/projects/${next.slug}`} className="ulink text-accent">Next project: {next.title} →</Link></nav>
      </article>
    );
  }
  const p = await getProject(params.slug);
  if (!p) notFound();
  const sections: [string, string | null][] = [["Business question", p.business_problem], ["Overview", p.description], ["Process", p.methodology], ["Key findings", p.key_findings], ["Limitations", p.limitations]];
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <Back />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{p.title}</h1>
      {p.summary && <p className="mt-3 text-lg text-mute">{p.summary}</p>}
      {p.tools && p.tools.length > 0 && <p className="mt-4 flex flex-wrap gap-2">{p.tools.map((t) => <span key={t} className="chip text-sm">{t}</span>)}</p>}
      <p className="mt-4 flex gap-4">{p.github_url && <a className="text-accent underline" href={p.github_url}>Source code</a>}{p.live_url && <a className="text-accent underline" href={p.live_url}>Live demo</a>}</p>
      {p.thumbnail_url && <img src={p.thumbnail_url} alt={`${p.title} preview`} className="mt-8 w-full rounded-xl border border-line" />}
      {sections.filter(([, v]) => v).map(([h, v]) => <Block key={h} title={h}><p className="whitespace-pre-line">{v}</p></Block>)}
    </article>
  );
}
