/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#90C226',
          dark: '#54A021',
        },
        secondary: {
          DEFAULT: '#E6B91E',
        },
        accent: {
          DEFAULT: '#E76618',
        },
        bg: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          dark: '#2C3C43',
          darker: '#1a1a1a',
        },
        text: {
          primary: '#2C3C43',
          secondary: '#666666',
          light: '#999999',
          inverse: '#ffffff',
        },
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.1)',
        'md': '0 4px 8px rgba(0,0,0,0.12)',
        'lg': '0 8px 16px rgba(0,0,0,0.15)',
        '2xl': '0 8px 16px rgba(0,0,0,0.15)',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
