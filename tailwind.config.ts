import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-iransans)'],
      },
      backgroundImage: {
        'banner-bg1': "url('/images/home-page/banner-bg1.svg')",
        'banner-bg2': "url('/images/home-page/banner-bg2.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;

