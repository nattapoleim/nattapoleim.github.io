/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        dark: '#484848',
        white: '#fff',
        bg: '#f5f5f5',
        light: '#FAFAFA',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      volk: ['Volkhov', 'serif'],
    },
  },
  plugins: [require('daisyui')],
}
