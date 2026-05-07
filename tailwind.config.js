/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#020B14',
        'cyber-navy': '#0A1628',
        'cyber-teal': '#00FFB2',
        'cyber-blue': '#0EA5E9',
        'cyber-amber': '#F59E0B',
        'cyber-red': '#EF4444',
        'cyber-muted': '#64748B',
        'cyber-text': '#E2E8F0',
        'cyber-purple': '#A78BFA',
        'cyber-coral': '#FB7185',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 10px rgba(0, 255, 178, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(0, 255, 178, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
