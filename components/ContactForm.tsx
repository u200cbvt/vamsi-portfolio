"use client";
import { useState } from "react";
// No server is involved: this opens the visitor's email app with the message filled in. It never claims a message was sent.
export default function ContactForm({ email }: { email: string }) {
  const [err, setErr] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget), name = String(f.get("name") ?? "").trim(), from = String(f.get("email") ?? "").trim(), msg = String(f.get("message") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(from) || !msg) { setErr("Please add your name, a valid email and a message."); return; }
    setErr("");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Portfolio enquiry from " + name)}&body=${encodeURIComponent(msg + "\n\n" + name + " (" + from + ")")}`;
  }
  const c = "mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2.5 outline-none transition focus:border-accent";
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <label className="block text-sm">Name<input name="name" autoComplete="name" className={c} /></label>
      <label className="block text-sm">Email<input name="email" type="email" autoComplete="email" className={c} /></label>
      <label className="block text-sm">Message<textarea name="message" rows={4} className={c} /></label>
      {err && <p role="alert" className="text-sm text-red-300">{err}</p>}
      <button className="btn bg-accent font-medium text-ink hover:shadow-[0_8px_24px_-8px_#12DCC6]">Write email</button>
      <p className="text-xs text-mute">This opens your email app with the message ready to send.</p>
    </form>
  );
}
