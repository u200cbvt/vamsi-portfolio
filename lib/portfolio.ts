import type { Project } from "./projects";
import type { Repo } from "./github";
export type Item = { key: string; title: string; summary: string; tags: string[]; tools: string[]; href?: string; external?: boolean; thumbnail?: string | null; art: string; featured?: boolean };
export type Case = { slug: string; title: string; summary: string; repoMatch?: string; tags: string[]; tools: string[]; objective: string; dataset?: string; process: string[]; deliverables?: string[] };
export const TAGS = ["SQL", "Power BI", "Python", "EDA", "Web Scraping"];
export const deriveTags = (t: string) => { const s = t.toLowerCase(), o: string[] = [];
  if (/\bsql\b|mysql|chinook/.test(s)) o.push("SQL"); if (/power ?bi|dashboard/.test(s)) o.push("Power BI"); if (/python|pandas|streamlit/.test(s)) o.push("Python");
  if (/\beda\b|exploratory|analysis/.test(s)) o.push("EDA"); if (/scrap/.test(s)) o.push("Web Scraping"); return o; };
// Project facts below come from the owner's resume. No findings are claimed beyond what it states.
export const cases: Case[] = [
  { slug: "used-car-market-analysis", title: "Used-Car Market Analysis (Cars24)", repoMatch: "used-car", tags: ["Python", "Web Scraping", "EDA"], tools: ["Python", "Pandas", "BeautifulSoup", "Regex", "Matplotlib"],
    summary: "Scraped used-car listings from Cars24 across 4 brands and 4 cities, cleaned them and analysed pricing and depreciation.",
    objective: "Understand how used-car prices and depreciation vary by brand, city, fuel type and ownership.",
    dataset: "Used-car listings scraped from Cars24: 4,000+ listings across 4 brands and 4 cities, consolidated into one analysis-ready dataset.",
    process: ["Collected the listings with a repeatable scraping routine.", "Cleaned and standardised raw records with regex rules and Pandas, resolving anomalies, duplicates and inconsistent formats.", "Engineered features such as vehicle age, price band and kilometre bucket.", "Analysed pricing and depreciation trends by brand, city, fuel type and ownership."],
    deliverables: ["A 25-slide stakeholder deck with pricing recommendations."] },
  { slug: "global-superstore-dashboard", title: "Global Superstore Sales Dashboard", repoMatch: "global_retail", tags: ["Power BI"], tools: ["Power BI", "DAX", "Excel"],
    summary: "An end-to-end Power BI dashboard that turns a raw sales dataset into self-service reporting for business users.",
    objective: "Give business users a self-service view of sales, profit and delivery performance.",
    dataset: "Global Superstore sales dataset.",
    process: ["Built KPI cards, interactive slicers, a gauge visual and drill-through pages.", "Designed two reporting layers: an executive summary and an analyst drill-down.", "Tracked segment profitability, category performance and delivery timeliness.", "Flagged loss-making transactions."] },
  { slug: "music-store-analytics", title: "Music Store Analytics (SQL)", repoMatch: "music_store", tags: ["SQL"], tools: ["MySQL", "GitHub"],
    summary: "SQL analysis of sales, geography and customer purchasing behaviour on a multi-table relational database.",
    objective: "Answer business questions about sales, geography and customer purchasing behaviour.",
    dataset: "Chinook sample database, a multi-table relational schema.",
    process: ["Answered 11 business questions using joins, CTEs and window functions.", "Documented the query logic and findings.", "Published the full project to GitHub."],
    deliverables: ["A 20-slide report.", "The project repository on GitHub."] },
  { slug: "telecom-churn-analysis", title: "Customer Churn Analysis: Telecom", tags: ["Python", "EDA"], tools: ["Python", "Pandas", "Seaborn", "Google Colab"],
    summary: "Profiled churn drivers across contract type, tenure, service add-ons and billing method.",
    objective: "Find which customer segments are most associated with churn.",
    process: ["Profiled churn across contract type, tenure, service add-ons and billing method using segment and correlation analysis.", "Converted the findings into retention recommendations for high-risk segments."] },
  { slug: "personal-expense-tracker", title: "Personal Expense Tracker", tags: ["Python"], tools: ["Python", "Streamlit"],
    summary: "A Streamlit app with validated data entry, category-wise spend analytics and automated summaries.",
    objective: "Track personal spending with clean data entry and automatic summaries.",
    process: ["Validated data entry.", "Category-wise spend analytics.", "Automated summaries."] },
];
export function buildItems(db: Project[], repos: Repo[]): Item[] {
  const used = new Set<string>();
  const fromCases: Item[] = cases.map((c, i) => { const r = c.repoMatch ? repos.find((x) => x.name.toLowerCase().includes(c.repoMatch!)) : undefined; if (r) used.add(r.name);
    return { key: c.slug, title: c.title, summary: c.summary, tags: c.tags, tools: c.tools, href: `/projects/${c.slug}`, art: `${c.title} | ${c.summary}`, featured: i < 3 }; });
  const fromDb: Item[] = db.map((p) => ({ key: p.id, title: p.title, summary: p.summary ?? "", tags: deriveTags(`${p.title} ${p.summary ?? ""} ${(p.tools ?? []).join(" ")} ${p.category ?? ""}`), tools: p.tools ?? [], href: `/projects/${p.slug}`, thumbnail: p.thumbnail_url, art: `${p.title} | ${p.summary ?? ""}`, featured: p.featured }));
  const dbUrls = db.map((p) => (p.github_url ?? "").toLowerCase());
  const fromRepos: Item[] = repos.filter((r) => !used.has(r.name) && !dbUrls.some((u) => u.endsWith("/" + r.name.toLowerCase()))).map((r) => ({ key: r.name, title: r.title, summary: r.description ?? "", tags: deriveTags(`${r.title} ${r.description ?? ""}`), tools: [], href: r.url, external: true, art: `${r.title} | ${r.description ?? ""}` }));
  return [...fromCases, ...fromDb, ...fromRepos];
}
