/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          black: "#000000",
          gold: "#E0D480",
          cream: "#F2EED1",
          olive: "#C3B649",
          orange: "#F97316",
          amber: "#FFA500",
          greenDark: "#426B1F",
          red: "#ED2626",
          green: "#059669",
          grayDark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
