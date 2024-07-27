/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        textGreen: '#255653',
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
      courier: ['Courier', 'space-mono'],
      inter: ['Inter', 'serif'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#f0f55d',
          'primary-content': '#075754',
          secondary: '#4a9390',
          'secondary-content': '#ffffff',
          accent: '#5b86e5',
          'accent-content': '#030612',
          neutral: '#fafafa',
          'neutral-content': '#151515',
          'base-100': '#f5f5f5',
          'base-200': '#d5d5d5',
          'base-300': '#b6b6b6',
          'base-content': '#151515',
          info: '#00dbff',
          'info-content': '#001116',
          success: '#4ade80',
          'success-content': '#021206',
          warning: '#fcd34d',
          'warning-content': '#161002',
          error: '#e44e21',
          'error-content': '#fff',
        },
      },
    ],
  },
}
