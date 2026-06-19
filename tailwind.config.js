import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main)",
        surface: "var(--bg-soft)",
        sidebar: "var(--bg-sidebar)",
        card: "var(--card-bg)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          soft: "var(--primary-soft)",
        },
        text: {
          main: "var(--text-main)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 18px 45px rgba(0, 0, 0, 0.07)",
        soft: "0 10px 30px rgba(21, 21, 21, 0.08)",
      },
      borderRadius: {
        glass: "24px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
