import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#fa684a", foreground: "#ffffff" },
        paper: "#f4f1e9",
        ink: "#18232e",
        coral: "#fa684a",
        acid: "#d2f66f",
        muted: "#68737c",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      container: {
        center: true,
        padding: "1.25rem",
        screens: { "2xl": "1440px" },
      },
    },
  },
  plugins: [],
};

export default config;
