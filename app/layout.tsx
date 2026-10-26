import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Link from "next/link";
import { site } from "@/lib/content";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: `${site.name} | Data Analyst & Business Analyst`, template: `%s | ${site.name}` },
  description: site.intro,
  openGraph: { title: `${site.name} | Data Analyst & Business Analyst`, description: site.intro, images: ["/avatar.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:bg-accent focus:p-2 focus:text-ink">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-mute md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} {site.name}. {site.role}.</p>
            <p className="flex gap-4"><Link href="/projects">Projects</Link><a href={site.linkedin}>LinkedIn</a><a href={site.github}>GitHub</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
