import Link from "next/link";
const links = [["Home","/"],["About","/#about"],["Projects","/projects"],["Skills","/#skills"],["Education","/#education"],["Resume","/#resume"],["Contact","/#contact"]];
export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-display text-lg">Vamsi</Link>
        <ul className="hidden gap-6 text-sm text-mute md:flex">
          {links.map(([l, h]) => <li key={l}><Link href={h} className="hover:text-paper">{l}</Link></li>)}
        </ul>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded border border-line px-3 py-1.5 text-sm">Menu</summary>
          <ul className="absolute right-0 mt-2 w-44 rounded border border-line bg-panel p-2 text-sm">
            {links.map(([l, h]) => <li key={l}><Link href={h} className="block rounded px-3 py-2 hover:bg-line">{l}</Link></li>)}
          </ul>
        </details>
      </nav>
    </header>
  );
}
