import Link from "next/link";
import { site, skillGroups, education } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
export const dynamic = "force-dynamic"; // published content must never be served stale
export default async function Home() {
  const { projects, error } = await getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.25fr_1fr] md:pt-24">
        <div className="rise">
          <p className="text-mute">{site.role}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">{site.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-mute">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded bg-accent px-5 py-3 font-medium text-ink">View projects</Link>
            <Link href="/#resume" className="rounded border border-line px-5 py-3 hover:border-accent">Resume</Link>
            <Link href="/#contact" className="rounded border border-line px-5 py-3 hover:border-accent">Contact</Link>
          </div>
          <svg aria-hidden="true" viewBox="0 0 400 90" className="mt-10 h-20 w-full max-w-md text-accent">
            <line x1="0" y1="85" x2="400" y2="85" stroke="#262b36" />
            <polyline className="draw" fill="none" stroke="currentColor" strokeWidth="2" points="0,70 50,62 100,66 150,40 200,48 250,28 300,34 350,12 400,18" />
          </svg>
        </div>
        <div className="rise mx-auto w-full max-w-sm">
          <img src="/avatar.jpg" alt="Portrait of Vamsi" width={800} height={1153} className="aspect-[4/5] w-full rounded-lg border border-line object-cover object-[40%_12%]" />
        </div>
      </section>

      {(featured.length > 0 || error) && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-display text-3xl">Featured projects</h2>
          {error && <p role="alert" className="mt-4 text-mute">{error}</p>}
          <div className="mt-6 grid gap-5 md:grid-cols-3">{featured.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
        </section>
      )}

      <section id="about" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="font-display text-3xl">About</h2>
        {site.about.map((t) => <p key={t} className="mt-4 text-lg leading-relaxed text-paper/85">{t}</p>)}
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-display text-3xl">Skills</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="rounded-lg border border-line bg-panel p-5">
              <h3 className="font-medium">{g.title}</h3>
              <ul className="mt-3 space-y-1 text-mute">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="font-display text-3xl">Education and training</h2>
        <ul className="mt-6 space-y-5">
          {education.map((e) => (
            <li key={e.title} className="border-l-2 border-accent pl-4">
              <p className="font-medium">{e.title}</p><p className="text-mute">{e.place}</p><p className="text-sm text-mute">{e.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="resume" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="font-display text-3xl">Resume</h2>
        {site.resumeUrl
          ? <a href={site.resumeUrl} download className="mt-5 inline-block rounded bg-accent px-5 py-3 font-medium text-ink">Download resume (PDF)</a>
          : <p className="mt-4 text-mute">The resume is not published yet. Contact me by email for a copy.</p>}
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="font-display text-3xl">Contact</h2>
        <ul className="mt-5 space-y-2 text-lg">
          <li><a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a className="text-accent underline" href={site.linkedin}>LinkedIn</a></li>
          <li><a className="text-accent underline" href={site.github}>GitHub</a></li>
        </ul>
      </section>
    </>
  );
}
