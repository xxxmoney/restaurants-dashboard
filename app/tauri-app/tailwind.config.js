/** @type {import('tailwindcss').Config} */
export default {
    // purge: false,
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '0.75rem',
                lg: '1rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
                '4xl': '2.5rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem',
            },
        },
    },
    plugins: [require('tailwindcss-primeui')],
}

