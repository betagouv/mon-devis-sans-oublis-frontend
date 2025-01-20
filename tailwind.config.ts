import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/page-sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      animation: {
        'confetti-fall': 'confettiFall linear forwards',
      },
      backgroundColor: {
        'grey-hover': '#f6f6f6',
      },
      keyframes: {
        confettiFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
