/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '0rem',
        sm: '4rem',
        lg: '6rem',
        xl: '7rem',
        '2xl': '10rem',
        '10xl': '20rem',
        '20xl': '30rem',
      },
    },
    extend: {
      // backgroundImage: {
      //   'textur-pattern': "url('/images/hero-pattern.svg')",
      // }
    },
  },
  plugins: [],
}