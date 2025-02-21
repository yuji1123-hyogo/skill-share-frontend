/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#18181B',    // ベースの暗い色
          secondary: '#27272A',  // やや明るい暗色
          accent: '#3F3F46'      // アクセントの暗色
        },
      },
      keyframes: {
        'music-bar': {
          '0%, 100%': {
            height: '40%',
          },
          '50%': {
            height: '100%',
          },
        },
      },
      animation: {
        'music-bar': 'music-bar 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

