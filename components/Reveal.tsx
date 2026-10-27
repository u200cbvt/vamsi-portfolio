"use client";
import { useEffect, useRef, useState } from "react";
export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const r = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false), [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const el = r.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { setOn(true); return; }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.12 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div ref={r} style={{ transitionDelay: `${delay}ms` }} className={`rv ${ready && !on ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"} transition duration-700 ${className}`}>{children}</div>;
}
