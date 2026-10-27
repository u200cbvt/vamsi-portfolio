"use client";
export default function Spot({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`spot ${className}`} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`); }}>{children}</div>
  );
}
