import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Two typefaces, self-hosted. `display` intentionally aliases the text
        // face — one family carries the whole hierarchy (see docs/DESIGN-DOCTRINE.md).
        sans: ['"Inter Variable"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Variable"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Restrained scale — h1 tops out at 3.5rem (reference-class ceiling)
        'hero': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.125rem, 1.5vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gold: {
          DEFAULT: '#c9a84c',
          50: '#fdf8ed',
          100: '#f8ecd0',
          200: '#f0d6a0',
          300: '#e7bc66',
          400: '#dfa63b',
          500: '#c9a84c',
          600: '#a08030',
          700: '#7a6024',
          800: '#5a4620',
          900: '#3d2f18',
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
