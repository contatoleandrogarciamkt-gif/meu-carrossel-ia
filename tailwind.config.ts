import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          gold: "#D4AF37",
          dark: "#0F172A",
          accent: "#1E293B",
        },
        travel: {
          blue: "#1E40AF",
          light: "#F0F9FF",
          accent: "#60A5FA",
        },
        alert: {
          yellow: "#FACC15",
          red: "#EF4444",
          black: "#111827",
        },
      },
      backgroundImage: {
        "gradient-premium": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
