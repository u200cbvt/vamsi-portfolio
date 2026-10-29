"use client";
import { useRef } from "react";
export default function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = r.current; if (!el) return;
    const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.02)`;
  };
  return <div ref={r} onMouseMove={move} onMouseLeave={() => { if (r.current) r.current.style.transform = ""; }} className={`tilt ${className}`}>{children}</div>;
}
