import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#0f1115", panel: "#161a22", line: "#262b36", paper: "#ecebe6", mute: "#9aa1ae", accent: "#7c83ff" },
    fontFamily: { sans: ["Inter","Segoe UI","system-ui","sans-serif"], display: ["Georgia","Cambria","Times New Roman","serif"] } } },
  plugins: [],
};
export default config;
