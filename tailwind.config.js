/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07030c',
          900: '#0a0512',
          850: '#0f081c',
          800: '#140c24',
          700: '#1b1030',
          600: '#23153d',
        },
        plum: {
          900: '#190e2b',
          800: '#25153f',
          700: '#341c59',
          500: '#6d3bbd',
          400: '#8357c5',
        },
        violet: {
          btn: '#7c4dff',
          hover: '#6d3ce9',
          glow: 'rgba(124, 77, 255, 0.35)',
        },
        mauve: {
          text: '#9e92ac',
          subtle: '#6f647d',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'feather-glass': '0 20px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'feather-card': '0 12px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'purple-glow': '0 8px 30px rgba(124, 77, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
