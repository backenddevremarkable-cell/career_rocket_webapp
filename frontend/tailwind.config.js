/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        career: {
          purple: "#9C27B0",
          "purple-dark": "#7B1FA2",
          gold: "#F5A623",
          orange: "#FF9800",
          lavender: "#F5E6F5",
          "lavender-light": "#F8F0FC",
          green: "#4CAF50",
          "green-light": "#E8F5E9",
          "purple-light": "#F3E8FF",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.08)",
        modal: "0 8px 40px rgba(0, 0, 0, 0.12)",
        glow: "0 8px 32px rgba(156, 39, 176, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-up-delay": "fadeInUp 0.6s ease-out 0.15s forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
