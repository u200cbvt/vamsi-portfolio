"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const links = [["Home", "/", "top"], ["About", "/#about", "about"], ["Projects", "/#projects", "projects"], ["Skills", "/#skills", "skills"], ["Education", "/#education", "education"], ["Contact", "/#contact", "contact"]];
export default function Nav() {
  const path = usePathname();
  const [active, setActive] = useState(""), [open, setOpen] = useState(false);
  useEffect(() => {
    if (path !== "/") { setActive(""); return; }
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    ["about", "projects", "skills", "education", "resume", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, [path]);
  const on = (id: string) => id === "top" ? path === "/" && !active : id === "projects" ? path.startsWith("/projects") || active === "projects" : active === id;
  const resume = <a href="/resume.pdf" target="_blank" rel="noopener" className="btn border border-accent px-3 py-1.5 text-sm text-accent hover:bg-accent hover:text-ink">Resume <span className="arr">↓</span></a>;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Vamsi home" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg font-bold text-ink transition group-hover:rotate-6 group-hover:scale-110">V</span>
          <span className="font-display text-lg transition group-hover:text-accent">Vamsi</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex gap-6 text-sm text-mute">{links.map(([l, h, id]) => <li key={l}><Link href={h} aria-current={on(id) ? "true" : undefined} className={`ulink transition hover:text-paper ${on(id) ? "text-paper" : ""}`}>{l}</Link></li>)}</ul>
          {resume}
        </div>
        <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)} className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded border border-line px-3 py-1.5 text-sm">Menu</summary>
          <ul className="absolute right-0 mt-2 w-48 rounded border border-line bg-panel p-2 text-sm">
            {links.map(([l, h]) => <li key={l}><Link href={h} onClick={() => setOpen(false)} className="block rounded px-3 py-2 hover:bg-line">{l}</Link></li>)}
            <li className="p-2">{resume}</li>
          </ul>
        </details>
      </nav>
    </header>
  );
}
