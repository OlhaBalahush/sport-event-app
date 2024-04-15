/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-bg': '#EDEDEB',
        'custom-bg-2': '#FFFFFF',
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
    },
  },
  variants: {
    extend: {},
  },
  purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
  plugins: [],
}

