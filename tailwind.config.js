import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      // "corporate",
      {
        corporate: {
          primary: "#1b1464",

          secondary: "#7f0001",

          accent: "#00ffff",

          neutral: "#d6d3d1",

          "base-200": "#FCFCFC",
          "base-100": "#F5F5F5",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#fbbf24",

          error: "#ff0000",
        },
      },
    ],
  },
};
