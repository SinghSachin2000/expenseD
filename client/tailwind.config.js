/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
     dropShadow: {
        'custom-black': '2px 10px 10px black', 
        'custom-red': '0 4px 6px black', 
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
