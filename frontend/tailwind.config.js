/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-bg': '#EDEDEB',
        'custom-white': '#FFFFFF',
        'custom-yellow': '#FED403',
        'custom-orange': '#E16F3D',
        'custom-light-blue': '#6BA7FF',
        'custom-dark-blue': '#015BBB',
        'custom-dark': '#131315',
        'custom-gray': '#65656B',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h': '1.5rem',     // heading
        'h-2': '1.25rem',    // heading 2
        'b': '1rem',     // body text
        'add': '0.75rem',   // additional text\
      },
    },
  },
  variants: {
    extend: {},
  },
  purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
  plugins: [],
}

