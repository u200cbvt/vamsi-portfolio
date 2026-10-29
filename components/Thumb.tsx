// Representative previews (not screenshots): each shows the kind of work in the project.
export const artKind = (art: string) => {
  const pick = (s: string) => /power bi|dashboard|superstore/.test(s) ? "dashboard" : /churn|telco|telecom/.test(s) ? "churn" : /expense|tracker|streamlit/.test(s) ? "tracker" : /scrap|cars24|used.?car/.test(s) ? "scrape" : /sql|chinook|music/.test(s) ? "sql" : "";
  const [title, rest = ""] = art.toLowerCase().split(" | ");
  return pick(title) || pick(rest) || "eda";
};
const A = "#12DCC6", B = "#329BFF", V = "#8B6AF7", L = "#20364E";
export default function Thumb({ art, className = "mb-4" }: { art: string; className?: string }) {
  const k = artKind(art);
  return (
    <svg viewBox="0 0 400 190" aria-hidden="true" className={`thumb w-full rounded-lg ${className}`}>
      <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#12243A" /><stop offset="1" stopColor="#07111F" /></linearGradient></defs>
      <rect width="400" height="190" fill="url(#tg)" />
      {k === "dashboard" && (<>
        {[0, 1, 2].map((i) => <g key={i}><rect x={24 + i * 82} y="20" width="72" height="34" rx="6" fill="#0D1929" stroke={L} /><rect x={32 + i * 82} y="30" width="30" height="5" rx="2" fill={A} /><rect x={32 + i * 82} y="41" width="46" height="7" rx="3" fill="#A4B4C8" opacity=".5" /></g>)}
        {[50, 80, 64, 104, 90, 120].map((h, i) => <rect key={i} x={30 + i * 26} y={172 - h} width="16" height={h} rx="3" fill={i % 2 ? B : A} />)}
        <circle cx="300" cy="125" r="32" fill="none" stroke={L} strokeWidth="13" /><circle cx="300" cy="125" r="32" fill="none" stroke={V} strokeWidth="13" strokeDasharray="120 201" transform="rotate(-90 300 125)" />
        <path d="M280 40h96" stroke={L} /><circle cx="344" cy="42" r="14" fill="none" stroke={A} strokeWidth="5" strokeDasharray="44 88" />
      </>)}
      {k === "sql" && (<>
        <rect x="22" y="18" width="200" height="154" rx="8" fill="#0D1929" stroke={L} />
        {[["WITH", 60, A], ["SELECT", 78, B], ["  JOIN", 66, V], ["  OVER (", 90, B], ["GROUP BY", 70, A]].map(([t, w, c], i) => <g key={i}><text x="34" y={46 + i * 24} fontSize="11" fontFamily="monospace" fill={c as string}>{t}</text><rect x={100} y={38 + i * 24} width={w as number} height="7" rx="3" fill="#A4B4C8" opacity=".35" /></g>)}
        <rect x="238" y="18" width="140" height="154" rx="8" fill="#0D1929" stroke={L} /><rect x="238" y="18" width="140" height="24" rx="8" fill={L} />
        {[0, 1, 2, 3, 4].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={250 + c * 62} y={54 + r * 22} width={r % 2 ? 40 : 50} height="8" rx="4" fill={c ? B : "#A4B4C8"} opacity=".45" />))}
      </>)}
      {k === "scrape" && (<>
        <rect x="20" y="16" width="190" height="158" rx="8" fill="#0D1929" stroke={L} /><rect x="20" y="16" width="190" height="20" rx="8" fill={L} /><circle cx="34" cy="26" r="3" fill={A} /><circle cx="45" cy="26" r="3" fill={B} />
        {[0, 1].map((r) => [0, 1].map((c) => <g key={`${r}${c}`}><rect x={32 + c * 88} y={46 + r * 62} width="78" height="36" rx="5" fill="#12243A" /><rect x={32 + c * 88} y={88 + r * 62} width="50" height="6" rx="3" fill="#A4B4C8" opacity=".5" /><rect x={32 + c * 88} y={99 + r * 62} width="30" height="6" rx="3" fill={A} /></g>))}
        <path d="M222 95h36m0 0-8-7m8 7-8 7" stroke={A} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="270" y="40" width="110" height="110" rx="8" fill="#0D1929" stroke={L} />
        {[0, 1, 2, 3, 4].map((r) => <g key={r}><rect x="280" y={52 + r * 20} width="38" height="8" rx="4" fill="#A4B4C8" opacity=".4" /><rect x="326" y={52 + r * 20} width={40 - (r % 3) * 8} height="8" rx="4" fill={B} opacity=".7" /></g>)}
      </>)}
      {k === "churn" && (<>
        {[[24, 92, 38], [150, 60, 70], [276, 40, 90]].map(([x, a, b], i) => <g key={i}><rect x={x} y={34} width="100" height="22" rx="5" fill="#0D1929" stroke={L} /><rect x={x + 8} y="42" width={a} height="6" rx="3" fill={A} /><rect x={x} y="68" width="100" height="14" rx="4" fill={L} /><rect x={x} y="68" width={b} height="14" rx="4" fill={i === 2 ? V : B} /></g>)}
        {[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={118 + c * 28} y={100 + r * 15} width="24" height="12" rx="2" fill={r === c ? A : B} opacity={r === c ? 0.9 : 0.15 + ((r * 3 + c * 7) % 5) * 0.13} />))}
      </>)}
      {k === "tracker" && (<>
        <rect x="22" y="18" width="150" height="154" rx="8" fill="#0D1929" stroke={L} />
        {[0, 1, 2].map((i) => <g key={i}><rect x="34" y={32 + i * 34} width="60" height="6" rx="3" fill="#A4B4C8" opacity=".5" /><rect x="34" y={43 + i * 34} width="126" height="16" rx="4" fill="#12243A" stroke={L} /></g>)}
        <rect x="34" y="136" width="60" height="22" rx="5" fill={A} />
        {[70, 110, 52, 90].map((h, i) => <rect key={i} x={200 + i * 42} y={160 - h} width="28" height={h} rx="4" fill={[A, B, V, B][i]} />)}
        <line x1="190" y1="160" x2="380" y2="160" stroke={L} />
      </>)}
      {k === "eda" && (<>
        <line x1="30" y1="165" x2="370" y2="165" stroke={L} /><line x1="30" y1="25" x2="30" y2="165" stroke={L} />
        {[[60, 140], [90, 120], [120, 128], [150, 100], [180, 95], [210, 80], [240, 88], [270, 62], [300, 55], [335, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={i % 3 ? A : B} />)}
        <polyline points="50,145 335,38" stroke={V} strokeWidth="2" strokeDasharray="6 5" fill="none" />
      </>)}
    </svg>
  );
}
