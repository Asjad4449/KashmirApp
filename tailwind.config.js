module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kashmir: {
          50: '#f8f7f4',
          100: '#e8e4d9',
          200: '#d4cbb3',
          300: '#bfb28d',
          400: '#ab9967',
          500: '#967f41',
          600: '#7a6534',
          700: '#5e4c27',
          800: '#42331a',
          900: '#26190d',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};