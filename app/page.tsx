import Link from "next/link";
import { site, chips, about, principles, skillGroups, softSkills, timeline, certs, languages } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import { getRepos } from "@/lib/github";
import { buildItems } from "@/lib/portfolio";
import ProjectExplorer from "@/components/ProjectExplorer";
import ContactForm from "@/components/ContactForm";
import Tilt from "@/components/Tilt";
import Spot from "@/components/Spot";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icons";
export const revalidate = 60;
const h2 = "text-3xl font-semibold tracking-tight md:text-4xl";
export default async function Home() {
  const [{ projects, error }, repos] = await Promise.all([getProjects(), getRepos()]);
  const items = buildItems(projects, repos);
  const repoText = repos.map((r) => ({ r, s: `${r.name} ${r.description ?? ""}`.toLowerCase() }));
  const proof = (keys: string[]) => keys.length ? repoText.filter(({ s }) => keys.some((k) => s.includes(k))).map(({ r }) => r) : [];
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 md:grid-cols-[1.15fr_1fr] md:pt-16">
        <div className="rise order-2 md:order-1">
          <p className="text-mute">Hi, I&apos;m Vamsi</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">I turn complex data into clear <span className="text-accent">business decisions.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{site.intro}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{chips.map((c) => <li key={c} className="rounded-md border border-line bg-panel px-3 py-1 text-sm">{c}</li>)}</ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/#projects" className="btn bg-accent font-medium text-ink hover:shadow-[0_8px_24px_-8px_#12DCC6]">View projects <span className="arr">→</span></Link>
            <a href={site.resumeUrl} target="_blank" rel="noopener" className="btn border border-line hover:border-accent"><Icon name="download" className="h-4 w-4" />Resume</a>
            <Link href="/#contact" className="btn btn-ghost">Contact</Link>
          </div>
        </div>
        <div className="rise order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md">
          <Tilt>
            <div className="relative overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(18,220,198,.35)]">
              <img src="/hero-portrait.jpg" alt="Portrait of Vamsi" width={740} height={1003} className="aspect-[740/1003] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 rounded-lg bg-ink/70 px-3 py-2 text-sm backdrop-blur"><span className="font-semibold">Vamsi</span> · Data Analyst</p>
            </div>
          </Tilt>
        </div>
      </section>

      <section aria-label="At a glance" className="mx-auto max-w-6xl px-5">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["database", String(items.length), "Projects"], ["cap", "BCA 2026", "CGPA 8.2"], ["chart", "Data Analytics", "Innomatics training"], ["pin", "Hyderabad", "Open to relocation"]].map(([i, a, b]) => (
            <li key={b}><Spot className="flex items-center gap-3 p-4"><span className="text-accent"><Icon name={i} className="h-6 w-6" /></span><span><span className="block text-lg font-semibold leading-tight">{a}</span><span className="text-sm text-mute">{b}</span></span></Spot></li>
          ))}
        </ul>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal className="grid items-center gap-10 md:grid-cols-[320px_1fr]">
          <img src="/about-photo.jpg" alt="Vamsi smiling at the camera" width={600} height={750} loading="lazy" className="aspect-[4/5] w-full max-w-xs rounded-2xl border border-line object-cover" />
          <div>
            <h2 className={h2}>About me</h2>
            {about.map((t) => <p key={t} className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{t}</p>)}
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">{principles.map((c) => <li key={c.title}><Spot className="h-full p-4"><span className="text-accent"><Icon name={c.icon} className="h-6 w-6" /></span><h3 className="mt-2 font-semibold">{c.title}</h3><p className="mt-1 text-sm text-mute">{c.text}</p></Spot></li>)}</ul>
          </div>
        </Reveal>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal><h2 className={h2}>Projects</h2><p className="mt-2 max-w-2xl text-mute">Practical projects built with real data and the tools above. Open any card for the question, process and tools.</p></Reveal>
        <div className="mt-6"><ProjectExplorer items={items} error={error} /></div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal><h2 className={h2}>Skills and tools</h2><p className="mt-2 text-mute">Grouped by what they are used for. Links show the projects where I used them.</p></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const used = Array.from(new Map(g.items.flatMap((s) => proof(s.keys)).map((r) => [r.name, r])).values());
            return (<Reveal key={g.title} delay={i * 80} className="h-full"><Spot className="h-full p-6"><h3 className="flex items-center gap-2 text-lg font-semibold"><span className="text-accent"><Icon name={g.icon} /></span>{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <li key={s.name} className="chip text-sm text-paper/90">{s.name}</li>)}</ul>
              {used.length > 0 && <p className="mt-4 text-sm text-mute">Used in: {used.map((r, j) => <span key={r.name}>{j > 0 && ", "}<a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">{r.title}</a></span>)}</p>}
            </Spot></Reveal>);
          })}
        </div>
        <Reveal delay={100}><div className="mt-5 rounded-xl border border-line bg-panel p-6"><h3 className="flex items-center gap-2 text-lg font-semibold"><span className="text-accent"><Icon name="bulb" /></span>Business and problem-solving</h3><ul className="mt-4 flex flex-wrap gap-2">{softSkills.map((s) => <li key={s} className="chip text-sm text-paper/90">{s}</li>)}</ul></div></Reveal>
      </section>

      <section id="education" className="mx-auto max-w-4xl px-5 py-16">
        <Reveal><h2 className={h2}>Education and certifications</h2></Reveal>
        <ol className="relative mt-8 space-y-6 border-l border-line pl-6">
          {timeline.map((e) => (<Reveal key={e.title}><li className="relative"><span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink" />
            <p className="text-sm text-accent">{e.group} · {e.when}</p><p className="mt-1 text-lg font-semibold">{e.title}</p><p className="text-mute">{e.place}</p>{e.note && <p className="text-sm text-mute">{e.note}</p>}</li></Reveal>))}
        </ol>
        <Reveal delay={100}><div className="mt-10 grid gap-5 md:grid-cols-2">
          <Spot className="p-5"><h3 className="flex items-center gap-2 font-semibold"><span className="text-accent"><Icon name="award" /></span>Certifications and writing</h3><ul className="mt-3 space-y-3">{certs.map((c) => <li key={c.title}><p>{c.title}</p><p className="text-sm text-mute">{c.by}</p></li>)}</ul></Spot>
          <Spot className="p-5"><h3 className="flex items-center gap-2 font-semibold"><span className="text-accent"><Icon name="pin" /></span>Languages</h3><p className="mt-3 text-mute">{languages}</p></Spot>
        </div></Reveal>
      </section>

      <section id="resume" className="mx-auto max-w-4xl px-5 py-16">
        <Reveal className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
          <div><h2 className={h2}>Resume</h2><p className="mt-3 text-mute">The full resume has my skills, projects, training and education in one place.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.resumeUrl} download="Vamsi_Bodigadla_Resume.pdf" className="btn bg-accent font-medium text-ink hover:shadow-[0_8px_24px_-8px_#12DCC6]"><Icon name="download" className="h-5 w-5" />Download resume</a>
              <a href={site.resumeUrl} target="_blank" rel="noopener" className="btn border border-line hover:border-accent"><Icon name="file" className="h-5 w-5" />Open in new tab</a>
            </div></div>
          <div className="paper p-6"><p className="text-2xl font-bold">{site.fullName}</p><p className="text-sm text-[#4a4f5c]">Data Analyst | SQL · Python · Power BI · Advanced Excel · Statistics</p>
            <p className="mt-3 text-sm leading-relaxed">Data Analyst (BCA, 2026) trained in SQL, Python, Power BI, Advanced Excel and Statistics, with end-to-end projects from data collection and cleaning to dashboards.</p></div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-5 py-16">
        <Reveal><h2 className={h2}>Get in touch</h2><p className="mt-2 text-mute">Open to entry-level Data Analyst and Business Analyst roles, and happy to relocate.</p></Reveal>
        <Reveal delay={80} className="mt-8 grid gap-8 md:grid-cols-2">
          <ul className="space-y-3">{[["mail", "Email", site.email, `mailto:${site.email}`], ["linkedin", "LinkedIn", "vamsi-bodigadla", site.linkedin], ["github", "GitHub", "u200cbvt", site.github]].map(([i, l, v, h]) => (
            <li key={l}><a href={h} className="spot flex items-center gap-4 p-4"><span className="grid h-11 w-11 place-items-center rounded-lg bg-raised text-accent"><Icon name={i} /></span><span><span className="block font-medium">{l}</span><span className="text-sm text-mute">{v}</span></span></a></li>))}</ul>
          <ContactForm email={site.email} />
        </Reveal>
      </section>
    </>
  );
}
