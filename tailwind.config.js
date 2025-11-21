/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#0f172a',
        neon: '#38bdf8',
        aurora: '#a855f7',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(168, 85, 247, 0.12), transparent 30%), linear-gradient(120deg, rgba(56,189,248,0.08), rgba(168,85,247,0.08))',
      },
      boxShadow: {
        glass: '0 10px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
