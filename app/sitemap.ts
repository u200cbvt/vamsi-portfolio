import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { cases } from "@/lib/portfolio";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { projects } = await getProjects();
  return [{ url: b }, { url: `${b}/projects` }, ...cases.map((c) => ({ url: `${b}/projects/${c.slug}` })), ...projects.map((p) => ({ url: `${b}/projects/${p.slug}` }))];
}
