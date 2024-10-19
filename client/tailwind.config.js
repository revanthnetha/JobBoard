/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text': {
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '22.24px',
          fontWeight: '500',
          lineHeight: '28.95px',
          textAlign: 'left',
          fontColor:'#292929B2',
          Opacity:"70%"
        },
      }
      addUtilities(newUtilities)
    },
  ],
}