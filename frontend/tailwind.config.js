/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#223254', // Matches the deep slate-navy of the logo
          dark: '#18243E',
          darker: '#11192A',
        },
        accent: {
          DEFAULT: '#F27B13', // Matches the vibrant orange of the logo
          hover: '#E06B08',
        },
        skyblue: {
          DEFAULT: '#4A90D9',
          light: '#EBF4FF',
        },
        page: '#F7F9FC',
        card: '#FFFFFF',
        body: '#223254', // Match text to the primary navy
        muted: '#6B7A99',
        success: '#27AE60',
        border: '#E4E8F0',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        btn: '10px',
        card: '14px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        strike: {
          '0%': { width: '0', opacity: '0' },
          '1%': { opacity: '1' },
          '100%': { width: '105%', opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        strike: 'strike 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
    },
  },
  plugins: [],
}
