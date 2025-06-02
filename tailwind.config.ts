import type { Config } from 'tailwindcss';

// WARNING: don't change to common js
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'knife-black': '#000000',
        'knife-blue': '#2563eb',
        'knife-pink': '#ec4899',
        'knife-yellow': '#eab308',
        'knife-green': '#16a34a',
        'knife-orange': '#ea580c',
      },
    },
  },
  plugins: [],
} satisfies Config;
