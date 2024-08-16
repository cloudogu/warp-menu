const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@cloudogu/ces-theme-tailwind/tailwind.presets.cjs')],
    content: [
        './src/**/*.js'
    ],
    plugins: [
        plugin(function({ addBase, theme }) {
            const scopedUtilities = {};
            const classes = Object.keys(theme('colors')).map(color => `.${color}`);

            classes.forEach(cls => {
                scopedUtilities[`#asd ${cls}`] = {};
            });

            // Add Tailwind utilities to the scoped selectors
            addBase(scopedUtilities);
        }),
    ],
    theme: {
        extend: {
            screens: {
                'warp-lg': '897px',
                'not-warp-lg': {'max': '896px'},
                'warp-md': {'max': '896px', 'min': '701px'},
                'warp-sm': {'max': '700px', 'min': '471px'},
                'warp-xs': {'max': '470px'},
            }
        }
    }
}
