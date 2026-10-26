import type { Metadata } from "next";
import { signIn } from "../actions";
export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };
export default function Login({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="mx-auto max-w-sm px-5 py-20">
      <h1 className="font-display text-3xl">Admin login</h1>
      {searchParams.error && <p role="alert" className="mt-4 rounded border border-red-400/60 p-3 text-red-300">{searchParams.error}</p>}
      <form action={signIn} className="mt-6 space-y-4">
        <label className="block">Email<input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded border border-line bg-panel px-3 py-2" /></label>
        <label className="block">Password<input name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded border border-line bg-panel px-3 py-2" /></label>
        <button className="w-full rounded bg-accent px-4 py-2 font-medium text-ink">Sign in</button>
      </form>
    </div>
  );
}
