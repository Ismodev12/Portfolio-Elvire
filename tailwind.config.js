/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:      '#060F1E',
        surface: '#0B1929',
        card:    '#0E2038',
        navy:    '#0B2D72',
        blue:    '#0992C2',
        cyan:    '#0AC4E0',
        cream:   '#F6E7BC',
        primary: '#0992C2',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        fadeUp:   { from: { opacity:0, transform:'translateY(24px)' }, to: { opacity:1, transform:'translateY(0)' } },
        fadeIn:   { from: { opacity:0 }, to: { opacity:1 } },
        float:    { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-14px)' } },
        pulse2:   { '0%,100%': { opacity:1 }, '50%': { opacity:0.4 } },
        shimmer:  { from: { backgroundPosition:'200% 0' }, to: { backgroundPosition:'-200% 0' } },
        orb:      { '0%,100%': { transform:'translate(0,0) scale(1)' }, '33%': { transform:'translate(30px,-40px) scale(1.08)' }, '66%': { transform:'translate(-20px,25px) scale(0.94)' } },
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease forwards',
        'fade-in':  'fadeIn 0.5s ease forwards',
        'float':    'float 7s ease-in-out infinite',
        'pulse2':   'pulse2 2s ease-in-out infinite',
        'shimmer':  'shimmer 3s linear infinite',
        'orb':      'orb 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
