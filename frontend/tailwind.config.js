/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0a0a0a",
          panel: "#121212",
          card: "#161616",
          border: "#262626",
        },
        brand: {
          red: "#dc1f2e",
          "red-dark": "#7a0d14",
          "red-light": "#f0454f",
        },
      },
      fontFamily: {
        display: ["'Archivo Black'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        script: ["'Caveat'", "cursive"],
        druk: ["Druk", "sans-serif"],
        trailers: ["TTTrailers", "sans-serif"],
        din: ["DINCondensed", "sans-serif"],
      },
      backgroundImage: {
        "red-gradient":
          "linear-gradient(180deg, #7a0d14 0%, #dc1f2e 60%, #f0454f 100%)",
      },
    },
  },
  plugins: [],
};
