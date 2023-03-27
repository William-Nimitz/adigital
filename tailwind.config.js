const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx}', './node_modules/flowbite-react/**/*.js'],
  theme: {
    extend: {
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
      spacing: {
        '0.5x': '2px',
        '1x': '4px',
        '2x': '8px',
        '2.5x': '10px',
        '3x': '12px',
        '4x': '16px',
        '5x': '20px',
        '6x': '24px',
        '8x': '32px',
        '12x': '48px',
        '16x': '64px',
        '18x': '72px',
        '32x': '128px',
        mdw: '915px',
        mdh: '945px',
      },
      fontFamily: {
        sans: ['itc-avant-garde-gothic-pro', ...defaultTheme.fontFamily.sans],
        itcGothic: [
          'itc-avant-garde-gothic-pro',
          ...defaultTheme.fontFamily.sans,
        ],
        tacticSansExt: ['Tactic-Ext', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },
      transitionDuration: {
        600: '600ms',
      },
      colors: {
        yellow: {
          50: '#FFC264',
          100: '#F99300',
          200: '#FDF6B2',
          800: '#723B13',
          900: '#633112',
        },
        white: {
          100: '#E4E4E4',
          200: '#FFFFFF',
        },
        green: {
          50: '#787A7C',
          70: '#32363D',
          90: '#13171D',
          100: '#F3F3F3',
          200: '#107C10',
          300: '#C9C9C9',
          400: '#9C9C9C',
          500: '#045404',
          600: '#A7F193',
          850: '#48A72F',
        },
        gray: {
          100: '#F3F3F3',
          200: '#E4E4E4',
          300: '#C9C9C9',
          400: '#9C9C9C',
          500: '#787A7C',
          600: '#464C54',
          700: '#32363D',
          800: '#272D35',
          900: '#13171D',
        },
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        primary: '#107C10',
      }),
      borderColor: (theme) => ({
        ...theme('colors'),
      }),
      fontSize: {
        xs: [
          '12px',
          {
            lineHeight: '150%',
            fontWeight: '500',
          },
        ],
        xssb: [
          '12px',
          {
            lineHeight: '150%',
            fontWeight: '600',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: '400',
          },
        ],
        smm: [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: '500',
          },
        ],
        smsb: [
          '14px',
          {
            lineHeight: '125%',
            fontWeight: '600',
          },
        ],
        smb: [
          '14px',
          {
            lineHeight: '150%',
            fontWeight: '700',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '100%',
            fontWeight: '500',
          },
        ],
        lg: [
          '18px',
          {
            lineHeight: '125%',
            fontWeight: '600',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '150%',
            fontWeight: '500',
          },
        ],
        xl2: [
          '24px',
          {
            lineHeight: '125%',
            fontWeight: '700',
          },
        ],
        xl3: [
          '30px',
          {
            lineHeight: '150%',
            fontWeight: '300',
          },
        ],
        xl4: [
          '36px',
          {
            lineHeight: '150%',
            fontWeight: '700',
          },
        ],
        xl5: [
          '48px',
          {
            lineHeight: '150%',
            fontWeight: '700',
          },
        ],
      },
      boxShadow: {
        primary: '0 0 0 3px rgba(72,180,97,0.5)',
        red: '0 0 0 3px rgba(225,83,97,.5)',
        disabled: '0 0 0 3px rgba(82,88,93,.5)',
        white:
          'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
        'locale-hover': '0px 0px 16px rgba(251, 86, 0, 0.75)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),
    require('flowbite/plugin'),
  ],
}
