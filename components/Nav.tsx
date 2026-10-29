"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icons";
const links = [["Home", "/", "top"], ["About", "/#about", "about"], ["Projects", "/#projects", "projects"], ["Skills", "/#skills", "skills"], ["Education", "/#education", "education"], ["Contact", "/#contact", "contact"]];
export default function Nav() {
  const path = usePathname();
  const [active, setActive] = useState(""), [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8); s(); window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);
  useEffect(() => {
    if (path !== "/") { setActive(""); return; }
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    ["about", "projects", "skills", "education", "resume", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  }, [open]);
  const on = (id: string) => id === "top" ? path === "/" && !active : id === "projects" ? path.startsWith("/projects") || active === "projects" : active === id;
  const resume = <a href="/resume.pdf" target="_blank" rel="noopener" className="btn h-10 border border-accent px-4 text-sm text-accent hover:bg-accent hover:text-ink"><Icon name="download" className="h-4 w-4" />Resume</a>;
  return (
    <header className={`sticky top-0 z-40 border-b border-transparent backdrop-blur transition-colors ${scrolled ? "nav-scrolled" : "bg-ink/40"}`}>
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Vamsi home" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-lg font-bold text-ink transition group-hover:rotate-6 group-hover:scale-110">V</span>
          <span className="leading-tight"><span className="block text-lg font-semibold transition group-hover:text-accent">Vamsi</span><span className="block text-xs text-mute">Data Analyst</span></span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex gap-6 text-sm text-mute">{links.map(([l, h, id]) => <li key={l}><Link href={h} aria-current={on(id) ? "true" : undefined} className={`ulink transition hover:text-paper ${on(id) ? "text-paper" : ""}`}>{l}</Link></li>)}</ul>
          {resume}
        </div>
        <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="h-11 rounded-lg border border-line px-4 text-sm md:hidden">{open ? "Close" : "Menu"}</button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="pop mx-5 mb-3 rounded-xl border border-line bg-panel p-2 text-base md:hidden">
          {links.map(([l, h]) => <li key={l}><Link href={h} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 hover:bg-raised">{l}</Link></li>)}
          <li className="p-2">{resume}</li>
        </ul>
      )}
    </header>
  );
}
