/** @type {import('tailwindcss').Config} */
 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     dropShadow: {
        'custom-black': '2px 10px 10px black', 
        'custom-red': '0 4px 6px black', 
      },
    },
  },
  plugins: [],
}
