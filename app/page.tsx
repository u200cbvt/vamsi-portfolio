import Link from "next/link";
import { site, skillGroups, education, aboutCards, about, inProgress } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import { getRepos } from "@/lib/github";
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
    ...inProgress,
  ].slice(0, 6);
  const repoText = repos.map((r) => ({ r, s: `${r.name} ${r.description ?? ""}`.toLowerCase() }));
  const proof = (keys: string[]) => keys.length ? repoText.filter(({ s }) => keys.some((k) => s.includes(k))).map(({ r }) => r) : [];
  return (
    <>
      <section className="glow">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.2fr_1fr] md:pt-20">
          <div className="rise">
            <p className="text-mute">Hello, I am Vamsi. Aspiring</p>
            <p className="mt-1 font-display text-3xl md:text-4xl"><RoleCycler /></p>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">{site.headline}</h1>
            <p className="mt-5 max-w-xl font-display text-xl italic text-[#f2b866]">{site.sub}</p>
            <p className="mt-4 max-w-xl text-lg text-mute">{site.intro}</p>
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

      <section aria-label="At a glance" className="mx-auto max-w-6xl px-5">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["BCA 2026", "CGPA 8.2"], ["Data Analytics training", "Innomatics Research Labs"], [`${repos.length + inProgress.length} projects`, "GitHub and in progress"], ["Python · SQL", "Power BI · Excel"]].map(([a, b]) => <li key={a}><Spot className="p-4"><p className="font-display text-lg">{a}</p><p className="text-sm text-mute">{b}</p></Spot></li>)}
        </ul>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">About</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-paper/85">{about}</p></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {aboutCards.map((c, i) => (<Reveal key={c.title} delay={i * 120} className="h-full"><Spot className="h-full p-6"><h3 className="font-display text-xl text-[#f2b866]">{c.title}</h3><p className="mt-3 text-paper/85">{c.text}</p></Spot></Reveal>))}
        </div>
        {repos.length > 0 && <Reveal delay={200}><p className="mt-6 text-mute">Projects below update automatically from my GitHub.</p></Reveal>}
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><div className="flex items-end justify-between"><h2 className="font-display text-3xl">Projects</h2><Link href="/projects" className="ulink text-accent">See all</Link></div></Reveal>
        {error && <p role="alert" className="mt-4 text-mute">{error}</p>}
        {items.length === 0 && !error && <p className="mt-6 text-mute">Projects will appear here as soon as they are published or added to GitHub.</p>}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((p, i) => <Reveal key={p.key} delay={(i % 3) * 100} className="h-full"><ProjectCard p={p} /></Reveal>)}</div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Skills</h2><p className="mt-2 text-mute">Each skill links to the work where I used it.</p></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {skillGroups.map((g, i) => {
            const used = Array.from(new Map(g.items.flatMap((s) => proof(s.keys)).map((r) => [r.name, r])).values());
            return (<Reveal key={g.title} delay={i * 120} className="h-full"><Spot className="h-full p-6"><h3 className="font-medium text-[#f2b866]">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <li key={s.name} className="chip text-sm text-paper/90">{s.name}</li>)}</ul>
              {used.length > 0 && <p className="mt-5 text-sm text-mute">Used in: {used.map((r, j) => <span key={r.name}>{j > 0 && ", "}<a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">{r.title}</a></span>)}</p>}
            </Spot></Reveal>);
          })}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Education and training</h2></Reveal>
        <ul className="mt-6 space-y-4">{education.map((e, i) => (<Reveal key={e.title} delay={i * 120}><li className="rounded-r-lg border-l-2 border-accent bg-panel/0 py-1 pl-4 transition hover:translate-x-2 hover:bg-panel"><p className="font-medium">{e.title}</p><p className="text-mute">{e.place}</p><p className="text-sm text-mute">{e.note}</p></li></Reveal>))}</ul>
      </section>

      <section id="resume" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Resume</h2>
          <div className="paper mt-6 p-6 md:p-8">
            <p className="font-display text-2xl">{site.fullName}</p>
            <p className="text-sm text-[#4a4f5c]">Aspiring Data Analyst / Business Analyst · {site.location}</p>
            <p className="mt-4 text-sm leading-relaxed">BCA graduate (2026, CGPA 8.2) with Data Analytics training from Innomatics Research Labs, Hyderabad. Builds analyses in Python, SQL and Power BI and explains the findings in business terms.</p>
            <p className="mt-3 text-sm"><strong>Skills:</strong> Python, SQL, Power BI, Excel, EDA, statistics, web scraping</p>
            <p className="mt-1 text-sm"><strong>Projects:</strong> Used car market analysis, Global retail sales dashboard, Music store SQL analysis</p>
          </div>
          <a href={site.resumeUrl} target="_blank" rel="noopener" className="btn mt-5 bg-accent font-medium text-ink">Open full resume (PDF, ATS-friendly) <span className="arr">↓</span></a></Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-5 py-14">
        <Reveal><h2 className="font-display text-3xl">Contact</h2>
          <div className="mt-5 flex flex-wrap gap-3"><a className="btn border border-line hover:border-accent" href={`mailto:${site.email}`}>Email <span className="arr">→</span></a><a className="btn border border-line hover:border-accent" href={site.linkedin}>LinkedIn <span className="arr">→</span></a><a className="btn border border-line hover:border-accent" href={site.github}>GitHub <span className="arr">→</span></a></div></Reveal>
      </section>
    </>
  );
}
