/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0A0A0A',
        'brand-dark': '#1C1C1E',
        'brand-gold': '#C9A96E',
        'brand-gold-light': '#E8C98A',
        'brand-cream': '#F5F0EB',
        'brand-gray': '#6B6B6B',
        'brand-gray-light': '#A0A0A0',
        'brand-text': '#0A0A0A',
        'brand-text-soft': '#4A4A4A',
        'brand-surface': '#F5F0EB',
        'brand-surface-alt': '#EFEFEF',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest2': '0.3em',
      },
    },
  },
  plugins: [],
}

