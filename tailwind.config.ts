import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional neutral palette with a single restrained accent.
        brand: {
          DEFAULT: "#2563eb", // blue-600
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
