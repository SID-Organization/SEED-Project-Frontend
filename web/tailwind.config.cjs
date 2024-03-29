/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "blue-weg": "#00579D",
        "dark-blue-weg": "#023A67",
        "light-blue-weg": "#0075B1",
        "breadcrumb-bg": "#D5EDFA",
      },
      boxShadow: {
        "breadcrumb-shadow": "0px -4px 10px 1px;",
        "page-title-shadow": "0 3px 9px -2px #b3b3b3;",
        "user-message-subheader-shadow": "-3px 1px 6px 1px #959595;",
      },
    },
    backgroundImage: {
      loginWallpaper: "url('./src/assets/login-background.png')",
      wegLogo: "url('./src/assets/weg-logo.png')",
      profilePicture: "url('./src/assets/profile-pic.png')",
    },
    dropShadow: {
      "weg-shadow": "9px 6px 15px #000000b8",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
