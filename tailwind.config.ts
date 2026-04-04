import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-editor': '#1e1e1e',
        'bg-sidebar': '#252526',
        'bg-tab-bar': '#2d2d2d',
        'bg-tab-active': '#1e1e1e',
        'bg-tab-inactive': '#2d2d2d',
        'bg-hover': '#2a2d2e',
        'bg-selected': '#37373d',
        'border-color': '#3d3d3d',
        'text-primary': '#d4d4d4',
        'text-muted': '#858585',
        'text-cyan': '#4ec9b0',
        'text-blue': '#9cdcfe',
        'text-orange': '#ce9178',
        'text-yellow': '#dcdcaa',
        'text-green': '#6a9955',
        'text-pink': '#c586c0',
        'text-white': '#ffffff',
        'statusbar-bg': '#007acc',
        'statusbar-txt': '#ffffff',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 3s ease-in-out infinite',
        fadeUp: 'fadeUp 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
