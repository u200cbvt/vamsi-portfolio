export const artKind = (t: string) => { const s = t.toLowerCase(); return /power bi|dashboard|superstore/.test(s) ? "bi" : /sql|database|chinook|queries/.test(s) ? "sql" : "eda"; };
const A = "#7c83ff", W = "#f2b866";
export default function Thumb({ text }: { text: string }) {
  const k = artKind(text);
  return (
    <svg viewBox="0 0 400 190" aria-hidden="true" className="thumb mb-4 w-full rounded-lg">
      <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1d2233" /><stop offset="1" stopColor="#12151c" /></linearGradient></defs>
      <rect width="400" height="190" fill="url(#tg)" />
      {k === "bi" && (<>
        {[60, 95, 75, 130, 110, 150].map((h, i) => <rect key={i} x={36 + i * 40} y={170 - h} width="26" height={h} rx="4" fill={i % 2 ? W : A} opacity=".9" />)}
        <circle cx="330" cy="70" r="34" fill="none" stroke="#262b36" strokeWidth="14" /><circle cx="330" cy="70" r="34" fill="none" stroke={A} strokeWidth="14" strokeDasharray="130 214" transform="rotate(-90 330 70)" />
      </>)}
      {k === "sql" && (<>
        <rect x="40" y="30" width="320" height="26" rx="6" fill={A} />
        {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={52 + c * 104} y={70 + r * 24} width={r === 1 ? 80 : 56 + ((r + c) % 3) * 12} height="10" rx="5" fill={r === 1 ? W : "#3a4152"} />))}
      </>)}
      {k === "eda" && (<>
        <line x1="30" y1="165" x2="370" y2="165" stroke="#3a4152" /><line x1="30" y1="25" x2="30" y2="165" stroke="#3a4152" />
        {[[60, 140], [90, 120], [120, 128], [150, 100], [180, 95], [210, 80], [240, 88], [270, 62], [300, 55], [335, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={i % 3 ? A : W} />)}
        <polyline points="50,145 335,38" stroke={W} strokeWidth="2" strokeDasharray="6 5" fill="none" />
      </>)}
    </svg>
  );
}
