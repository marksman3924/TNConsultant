/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark': '#1e1e1e',
        'dark-lighter': '#2a2a2a',
        'cream': '#FFF0CA',
        'gold': '#D4AF37',
        'gold-light': '#E5C158',
        'gold-muted': 'rgba(255, 240, 202, 0.15)',
        'rose': '#cc3366',
        'gray': '#69727d',
        'gray-light': '#cacaca',
        'gray-dark': '#a1a1a1',
        
        'primary': '#1e1e1e',
        'accent': '#FFF0CA',
        'neutral-dark': '#1e1e1e',
        'neutral-gray': '#69727d',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],  // ✅ Changed
        body: ['Montserrat', 'system-ui', 'sans-serif'],  // ✅ Changed
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '0.92', fontWeight: '600' }],
        'hero-mobile': ['42px', { lineHeight: '0.92', fontWeight: '600' }],
        'display': ['36px', { lineHeight: '1.40', fontWeight: '600' }],
        'heading-xl': ['48px', { lineHeight: '1.2' }],
        'heading-lg': ['32px', { lineHeight: '1.3' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.02em',
      },
    },
  },
  plugins: [],
}