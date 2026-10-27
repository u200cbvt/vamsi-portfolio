"use client";
import { useEffect, useState } from "react";
const roles = ["Data Analyst", "Business Analyst", "MIS Executive", "Power BI Reporting"];
export default function RoleCycler() {
  const [i, setI] = useState(0), [n, setN] = useState(roles[0].length), [del, setDel] = useState(false), [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return; }
    const w = roles[i];
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1); else if (!del) setDel(true);
      else if (n > 0) setN(n - 1); else { setDel(false); setI((i + 1) % roles.length); }
    }, !del && n === w.length ? 1500 : del ? 35 : 75);
    return () => clearTimeout(t);
  }, [i, n, del]);
  return (<span><span className="sr-only">{roles.join(", ")}</span><span aria-hidden="true" className="text-accent">{still ? roles[0] : roles[i].slice(0, n)}<span className="caret" /></span></span>);
}
