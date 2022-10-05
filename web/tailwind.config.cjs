/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "blue-weg": "#00579D",
        "breadcrumb-bg": "#D5EDFA",
      },
      boxShadow: {
        "breadcrumb-shadow": "0px -4px 10px 1px;",
      },
    },
    backgroundImage: {
      loginWallpaper: "url('./src/assets/login-background.png')",
      wegLogo: "url('./src/assets/weg-logo.png')",
    },
    dropShadow: {
      "weg-shadow": "9px 6px 15px #000000b8",
    },
  },
  plugins: [],
};
