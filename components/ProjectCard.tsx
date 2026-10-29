import Link from "next/link";
import Spot from "./Spot";
import Thumb from "./Thumb";
import type { Item } from "@/lib/portfolio";
export default function ProjectCard({ p }: { p: Item }) {
  const inner = (<>
    {p.thumbnail ? <img src={p.thumbnail} alt={`${p.title} preview`} loading="lazy" className="mb-4 aspect-[400/190] w-full rounded-lg object-cover" /> : <Thumb art={p.art} />}
    <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
    {p.tags.length > 0 && <p className="mt-2 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="rounded-md bg-raised px-2 py-0.5 text-xs text-accent">{t}</span>)}</p>}
    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">{p.summary || "Open the repository to see the code and notebooks."}</p>
    {p.href && <p className="mt-4 text-sm font-medium text-accent">{p.external ? "View on GitHub" : "View case study"} <span className="arr inline-block">→</span></p>}
  </>);
  const cls = "block h-full p-5 focus-visible:outline-offset-[-4px]";
  return <Spot className="h-full">{!p.href ? <div className={cls}>{inner}</div> : p.external ? <a href={p.href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a> : <Link href={p.href} className={cls}>{inner}</Link>}</Spot>;
}
