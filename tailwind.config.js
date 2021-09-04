module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontSize: {
        'rick-big': ['12rem', { lineHeight: '12rem' }],
      },
      colors: {
        bootstrap_primary: '#0d6efd',
        bootstrap_secondary: '#6c757d',
        bootstrap_success: '#198754',
        bootstrap_danger: '#dc3545',
        bootstrap_info: '#0dcaf0',
      },

      textColor: {
        'primary': '#3490dc',
        'secondary': '#108acc',
        'warning': '#9e2fe3',
        'danger': '#dc3545'
      },
      fontFamily: {
        'rick-font': ['Architects Daughter']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
