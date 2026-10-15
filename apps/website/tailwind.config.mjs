import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                surface: {
                    950: '#0A0A0A',
                    900: '#081C1D',
                    850: '#0B2B2A',
                    800: '#0F3D2E',
                    700: '#1E6B51',
                    600: '#3A9B74',
                    500: '#6E857A',
                    400: '#8E949A',
                    300: '#B4B8BE',
                    200: '#D4D7DB',
                    100: '#E7E9EB',
                    50: '#FFFFFF',
                },
                accent: {
                    950: '#081C1D',
                    900: '#0B2B2A',
                    800: '#0F3D2E',
                    700: '#1E6B51',
                    600: '#2B825F',
                    500: '#3A9B74',
                    400: '#58B48C',
                    300: '#7AC9A4',
                    200: '#A6DCC0',
                    100: '#D0EBDD',
                    50: '#EEF7F1',
                },
                warm: {
                    500: '#d4a853',
                    400: '#e0bc6a',
                    300: '#ecd08a',
                },
            },
            fontFamily: {
                display: [
                    '"Bricolage Grotesque Variable"',
                    '"Bricolage Grotesque"',
                    '"DM Sans"',
                    'system-ui',
                    'sans-serif',
                ],
                body: ['"DM Sans"', 'system-ui', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            fontSize: {
                '7xl': [
                    '4.5rem',
                    { lineHeight: '1.02', letterSpacing: '-0.03em' },
                ],
                '8xl': [
                    '6rem',
                    { lineHeight: '0.98', letterSpacing: '-0.035em' },
                ],
                '9xl': [
                    '8rem',
                    { lineHeight: '0.95', letterSpacing: '-0.04em' },
                ],
            },
            animation: {
                'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 0.6s ease forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [typography],
};
