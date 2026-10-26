import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { signOut } from "../actions";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <nav aria-label="Admin" className="flex gap-5"><Link href="/admin">Dashboard</Link><Link href="/admin/projects">Projects</Link></nav>
        <form action={signOut}><button className="rounded border border-line px-3 py-1.5 text-sm">Log out</button></form>
      </div>
      {children}
    </div>
  );
}
