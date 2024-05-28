/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:{
        'grey-dark': '#2A4144',
        'grey-light': '#86A2A5',
        'green-dark': '#0C7D69',
        'green-light': '#E0F1E8',
        'red-err': '#D73C3C'
      },
      fontFamily: {
        sans: ['karla', 'sans-serif'],
      },
      screens: {
        mobile: {'max': '768px'},
        tablet: {'min': '768px'},
        desktop: {'min': '992px'}
      },
      spacing: {
        '100': '8px',
        '150': '12px',
        '200': '16px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '1600': '128px',
      },
      backgroundImage: {
        'btn-gradient': "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)," +
          " var(--color-green-600, #0C7D69)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

