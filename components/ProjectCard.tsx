import Link from "next/link";
import Spot from "./Spot";
import Thumb from "./Thumb";
export type CardItem = { key: string; title: string; summary?: string | null; category?: string | null; tools?: string[]; href?: string; external?: boolean; thumbnail?: string | null; featured?: boolean; badge?: string };
export default function ProjectCard({ p }: { p: CardItem }) {
  const inner = (<>
    {p.thumbnail ? <img src={p.thumbnail} alt={`${p.title} preview`} loading="lazy" className="mb-4 aspect-video w-full rounded-lg object-cover" /> : <Thumb text={`${p.title} ${p.summary ?? ""}`} />}
    <p className="flex items-center gap-2 text-sm text-mute">{[p.category, p.featured ? "Featured" : null].filter(Boolean).join(" · ")}{p.badge && <span className="rounded-full border border-gold/60 px-2 py-0.5 text-xs text-gold">{p.badge}</span>}</p>
    <h3 className="mt-1 font-display text-xl">{p.title}</h3>
    <p className="mt-2 line-clamp-4 text-mute">{p.summary || "Open the repository to see the code and notebooks."}</p>
    {p.tools && p.tools.length > 0 && <p className="mt-3 text-sm text-paper/80">{p.tools.join(", ")}</p>}
    {p.href && <p className="mt-4 text-sm text-accent">{p.external ? "View on GitHub" : "Read case study"} <span className="arr inline-block">→</span></p>}
  </>);
  const cls = "block h-full p-5";
  return <Spot className="h-full">{!p.href ? <div className={cls}>{inner}</div> : p.external ? <a href={p.href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a> : <Link href={p.href} className={cls}>{inner}</Link>}</Spot>;
}
