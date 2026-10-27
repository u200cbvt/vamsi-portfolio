export type Repo = { name: string; title: string; description: string | null; url: string; homepage: string | null; language: string | null; updated: string };
const OWNER = "u200cbvt";
// Public repositories are pulled automatically (cached 1 hour), so new projects appear without uploading anything.
export async function getRepos(): Promise<Repo[]> {
  try {
    const r = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed`, { headers: { Accept: "application/vnd.github+json", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) }, next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const d = (await r.json()) as any[];
    return d.filter((x) => !x.fork && !x.archived && x.name !== "vamsi-portfolio" && x.name !== OWNER && String(x.description ?? "").trim().length > 30).map((x) => ({
      name: x.name,
      title: String(x.name).replace(/[-_]+/g, " ").trim().replace(/\b\w/g, (c: string) => c.toUpperCase()).replace(/\b(sql|eda|bi|ml|ai)\b/gi, (m: string) => m.toUpperCase()),
      description: String(x.description).replace(/\*+/g, "").trim(), url: x.html_url, homepage: x.homepage || null, language: x.language ?? "Project", updated: x.pushed_at,
    }));
  } catch { return []; }
}
export const langCounts = (repos: Repo[]) => Object.entries(repos.reduce<Record<string, number>>((a, r) => (r.language ? { ...a, [r.language]: (a[r.language] ?? 0) + 1 } : a), {})).sort((a, b) => b[1] - a[1]);
