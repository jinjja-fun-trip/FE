/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // 기존 변수 기반 시스템 유지
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        "brand-100": "var(--color-100)",
        "brand-200": "var(--color-200)",
        "brand-300": "var(--color-300)",
        "brand-400": "var(--color-400)",
        "brand-900": "var(--color-900)",
        "brand-800": "var(--color-800)",
        "brand-700": "var(--color-700)",
        "brand-600": "var(--color-600)",
        "brand-500": "var(--color-500)",

        // 🎨 내가 추가한 고정 컬러 팔레트
        theme: {
          primary: '#3BAFDA',
          secondary: '#1C3F5E',
          accent: '#F5B041',
          success: '#27AE60',
          danger: '#E74C3C',
          warning: '#E67E22',
          info: '#3498DB',
        }
      },

      // 애니메이션 추가
      keyframes: {
        bounceSmall: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bounce-small': 'bounceSmall 1s infinite',
      },
    },
  },
//  plugins: [require("tailwindcss-animate")],
}