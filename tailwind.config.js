/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.css', './src/**/*.tsx'],
  theme: {
    screens: {
      xs: '0px',
      sm: '440px',
      md: '700px',
      lg: '1280px',
      xl: '1920px',
    },
    fontFamily: {
      sans: 'HumanSans, Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    extend: {},
  },
  plugins: [],
};
