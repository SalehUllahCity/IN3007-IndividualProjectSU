/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // colour palette 
       background: {
          DEFAULT: '#F6FBF8',
          surface: '#FFFFFF',
        },
        // Text colors
        text: {
          primary: '#0F2F23',
          secondary: '#5E7A6E',
          muted: '#8FAEA3',
        },
        // Primary brand colors
        primary: {
          DEFAULT: '#7FC8A9',
          hover: '#5FB594',
          soft: '#DFF3E9',
        },
        // Focus colors
        focus: {
          DEFAULT: '#2E7D6F',
          soft: '#CFEAE4',
        },
        // Motivation/Warning colors
        motivation: {
          DEFAULT: '#F2C94C',
          soft: '#FFF4CC',
        },
        // State colors
        state: {
          error: '#E07A5F',
          'error-soft': '#FCEDEA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // more sore Inter
      },
    },
  },
  plugins: [],
}