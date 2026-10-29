import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#07111F", panel: "#0D1929", raised: "#12243A", line: "#20364E", paper: "#F1F5FA", mute: "#A4B4C8", accent: "#12DCC6", blue: "#329BFF", violet: "#8B6AF7", gold: "#e6b567" },
    fontFamily: { sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"], display: ["Inter", "Segoe UI", "system-ui", "sans-serif"] },
  } },
  plugins: [],
};
export default config;
