import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'up-normal': 'up 2s',
      },
      keyframes: {
        up: {
          '0%': { height: '100vh' },
          '50%': { height: '100vh' },
          '100%': { height: '15vh' },
        }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
       },
    },
  },
  plugins: [],
};
export default config;
