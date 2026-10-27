import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#0a1120", panel: "#111a2c", line: "#1f2b42", paper: "#eef2f6", mute: "#93a1b8", accent: "#2dd4bf", gold: "#e6b567" },
    fontFamily: { sans: ["Inter","Segoe UI","system-ui","sans-serif"], display: ["Georgia","Cambria","Times New Roman","serif"] } } },
  plugins: [],
};
export default config;
