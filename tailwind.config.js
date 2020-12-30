module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-debug-screens")],
}
