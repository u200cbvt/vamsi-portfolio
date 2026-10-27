import Link from "next/link";
import { site, skillGroups, education, aboutCards } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import { getRepos, langCounts } from "@/lib/github";
import ProjectCard, { type CardItem } from "@/components/ProjectCard";
import RoleCycler from "@/components/RoleCycler";
import Tilt from "@/components/Tilt";
import Spot from "@/components/Spot";
import Reveal from "@/components/Reveal";
export const revalidate = 60;
export default async function Home() {
  const [{ projects, error }, repos] = await Promise.all([getProjects(), getRepos()]);
  const gh = repos.filter((r) => !projects.some((p) => p.github_url?.toLowerCase().endsWith(`/${r.name.toLowerCase()}`)));
  const items: CardItem[] = [
    ...projects.map((p) => ({ key: p.id, title: p.title, summary: p.summary, category: p.category, tools: p.tools ?? [], href: `/projects/${p.slug}`, thumbnail: p.thumbnail_url, featured: p.featured })),
    ...gh.map((r) => ({ key: r.name, title: r.title, summary: r.description, category: r.language, href: r.url, external: true })),
  ].slice(0, 6);
  const langs = langCounts(repos);
  return (
    <>
      <section className="glow">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.2fr_1fr] md:pt-20">
          <div className="rise">
            <p className="text-mute">Hello, I am Vamsi. Aspiring</p>
            <p className="mt-1 font-display text-3xl md:text-4xl"><RoleCycler /></p>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">{site.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-mute">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn bg-accent font-medium text-ink hover:shadow-[0_8px_24px_-8px_#7c83ff]">View projects <span className="arr">→</span></Link>
              <Link href="/#resume" className="btn border border-line hover:border-accent">Resume</Link>
              <Link href="/#contact" className="btn border border-line hover:border-accent">Contact</Link>
            </div>
            <svg aria-hidden="true" viewBox="0 0 400 90" className="mt-10 h-20 w-full max-w-md text-accent">
              <line x1="0" y1="85" x2="400" y2="85" stroke="#262b36" />
              <polyline className="draw" fill="none" stroke="currentColor" strokeWidth="2" points="0,70 50,62 100,66 150,40 200,48 250,28 300,34 350,12 400,18" />
            </svg>
          </div>
          <div className="rise mx-auto w-full max-w-md">
            <Tilt><img src="/avatar-full.jpg" alt="Portrait of Vamsi" width={1000} height={1000} className="aspect-square w-full rounded-2xl border border-line object-cover shadow-2xl" /></Tilt>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">About</h2></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {aboutCards.map((c, i) => (<Reveal key={c.title} delay={i * 120} className="h-full"><Spot className="h-full p-6"><h3 className="font-display text-xl text-accent">{c.title}</h3><p className="mt-3 text-paper/85">{c.text}</p></Spot></Reveal>))}
        </div>
        {repos.length > 0 && <Reveal delay={200}><p className="mt-6 text-mute">{repos.length} public GitHub {repos.length === 1 ? "repository" : "repositories"}, updated automatically.</p></Reveal>}
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><div className="flex items-end justify-between"><h2 className="font-display text-3xl">Projects</h2><Link href="/projects" className="ulink text-accent">See all</Link></div></Reveal>
        {error && <p role="alert" className="mt-4 text-mute">{error}</p>}
        {items.length === 0 && !error && <p className="mt-6 text-mute">Projects will appear here as soon as they are published or added to GitHub.</p>}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((p, i) => <Reveal key={p.key} delay={(i % 3) * 100} className="h-full"><ProjectCard p={p} /></Reveal>)}</div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Skills</h2></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {skillGroups.map((g, i) => (<Reveal key={g.title} delay={i * 120} className="h-full"><Spot className="h-full p-6"><h3 className="font-medium">{g.title}</h3><ul className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <li key={s} className="chip text-sm text-mute">{s}</li>)}</ul></Spot></Reveal>))}
        </div>
        {langs.length > 0 && (<Reveal delay={150}><h3 className="mt-10 font-medium">Languages in my repositories</h3><ul className="mt-3 flex flex-wrap gap-2">{langs.map(([l, n]) => <li key={l} className="chip text-sm text-mute">{l} · {n} {n === 1 ? "repo" : "repos"}</li>)}</ul></Reveal>)}
      </section>

      <section id="education" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Education and training</h2></Reveal>
        <ul className="mt-6 space-y-4">{education.map((e, i) => (<Reveal key={e.title} delay={i * 120}><li className="rounded-r-lg border-l-2 border-accent bg-panel/0 py-1 pl-4 transition hover:translate-x-2 hover:bg-panel"><p className="font-medium">{e.title}</p><p className="text-mute">{e.place}</p><p className="text-sm text-mute">{e.note}</p></li></Reveal>))}</ul>
      </section>

      <section id="resume" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Resume</h2>
          {site.resumeUrl ? <a href={site.resumeUrl} download className="btn mt-5 bg-accent font-medium text-ink">Download resume (PDF) <span className="arr">↓</span></a> : <p className="mt-4 text-mute">The resume is not published yet. Contact me by email for a copy.</p>}</Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Contact</h2>
          <div className="mt-5 flex flex-wrap gap-3"><a className="btn border border-line hover:border-accent" href={`mailto:${site.email}`}>Email <span className="arr">→</span></a><a className="btn border border-line hover:border-accent" href={site.linkedin}>LinkedIn <span className="arr">→</span></a><a className="btn border border-line hover:border-accent" href={site.github}>GitHub <span className="arr">→</span></a></div></Reveal>
      </section>
    </>
  );
}
