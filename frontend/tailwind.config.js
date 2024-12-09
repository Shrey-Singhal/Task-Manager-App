/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGrey: '#FAF9F8',
        customDarkBlue: '#272783',
        customLightBlue: '#EDECF5',
        customPurple: '#EBE5FF',
        customSkyBlue: '#DFF5F8',
        customGreen: '#E3F7DA'
      },
    },
  },
  plugins: [],
}

