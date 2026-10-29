import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Icon from "@/components/Icons";
import { site } from "@/lib/content";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "Vamsi Bodigadla | Entry-level Data Analyst & Business Analyst";
const description = "2026 BCA graduate trained in data analytics. SQL, Python, Power BI and Excel projects, resume and contact details.";
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: title, template: "%s | Vamsi Bodigadla" }, description,
  openGraph: { title, description, images: ["/hero-portrait.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-accent focus:p-2 focus:text-ink">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <footer className="mt-20 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-mute sm:flex-row">
            <p><span className="font-semibold text-paper">Vamsi</span> · Data · Insights · Impact · © {new Date().getFullYear()}</p>
            <p className="flex items-center gap-4">
              {[["mail", `mailto:${site.email}`, "Email"], ["linkedin", site.linkedin, "LinkedIn"], ["github", site.github, "GitHub"]].map(([i, h, l]) => <a key={l} href={h} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full transition hover:text-accent"><Icon name={i} /></a>)}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
