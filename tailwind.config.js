/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['"Orbitron"', 'ui-sans-serif', 'system-ui', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
      },
      // (선택) prose 기본 폰트도 Orbitron으로
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.orbitron').join(', '),
            'h1,h2,h3,h4': { fontFamily: theme('fontFamily.orbitron').join(', ') },
            'blockquote,figcaption,code': { fontFamily: theme('fontFamily.orbitron').join(', ') },
          }
        }
      })
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
