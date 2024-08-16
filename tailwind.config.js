const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@cloudogu/ces-theme-tailwind/tailwind.presets.cjs')],
    content: [
        // './src/**/*.js'
        './sample/index.html'
    ],
    plugins: [
        plugin(function ({addBase, theme}) {
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
            },
            colors: {
                warp: {
                    bg: {
                        DEFAULT: "var(--warp-bg)",
                        hover: 'var(--warp-bg-hover)',
                        active: 'var(--warp-bg-active)',
                    },
                    border: {
                        DEFAULT: 'var(--warp-border)',
                        hover: 'var(--warp-border-hover)',
                        active: 'var(--warp-border-active)',
                    },
                    text: {
                        DEFAULT: 'var(--warp-text)',
                        hover: 'var(--warp-text-hover)',
                        active: 'var(--warp-text-active)',
                    },
                }
            },
            variables: {
                DEFAULT: {
                    warp: {
                        logo: "url('data:image/svg+xml;base64,PHN2ZyBpZD0iZ2VzY2hsb3NzZW5lc19FbGVtZW50IiBkYXRhLW5hbWU9Imdlc2NobG9zc2VuZXMgRWxlbWVudCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgODM4LjY3IDUxMy43NyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyNGEyZGN9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzIxLjMxIDMyOS4zNmE2MC42NiA2MC42NiAwIDAgMS0xMTcuMSAyMi4yNGwuNTMgMi41MS0xMTguMSAyMy4zN2E2Ny43MyA2Ny43MyAwIDAgMS0xMzUuNC4xN2wtMTE5LTIzLjU0YTYwLjY4IDYwLjY4IDAgMSAxIDUuMjctMjQuNzVsMTE3LjMgMjQuMTRhNjcuODMgNjcuODMgMCAwIDEgNTEuNjQtNDQuNjRoLS4wNnYtNzAuMjVhNjAuNjggNjAuNjggMCAxIDEgMjQuMjUuMTV2NzBhNjguMjEgNjguMjEgMCAwIDEgNTIuMjcgNDQuNjFsMTE2LjUzLTI0IC42IDIuODFjLS4wNS0uOTMtLjA3LTEuODctLjA3LTIuODFhNjAuNjYgNjAuNjYgMCAxIDEgMTIxLjMxIDB6Ii8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzQyIDE3My41MWMtNTUuMzItMjUuODgtMTA2LjUtMjMtMTQ3LjY1LTYuMTgtMi00Mi42Ny0yMC44OC04My43Ni01Ny0xMThDNDY3LjExLTE3LjE4IDM1My44Ni0xMSAyODcuNTUgNjIuNzVjLTI3LjggMzAuOTMtNDIgNjcuNDEtNDQuMiAxMDQuNTYtNDEuMTMtMTYuODQtOTIuMy0xOS42Ny0xNDcuNTkgNi4yLTcwLjI0IDMyLjg2LTEyNS42IDEzNi4xMi03NS4wNyAyMzYuMTQgMzYuODIgNzIuOSAxMjguNDkgMTA3LjU3IDE4NyAxMDEuNjRsNDIzLjU3LjEzQzY4OS44MSA1MTYuNzMgNzgwLjQ2IDQ4MiA4MTcgNDA5LjY1YzUwLjU1LTEwMC4wMi00LjgxLTIwMy4yOC03NS0yMzYuMTR6bTE0LjU5IDIwOS4yM2MtMjEuNTUgMzkuNy01OC43NSA1NC43My0xMDAuNzcgNTguNTRINTA2LjU5Yy0xOS4zOSAyNC40NS00Ny4zNCA0My41OC04Ny41NSA0My41OC0zNS44MyAwLTY2LjQyLTE1LjI1LTg3LjU1LTQzLjU4bC0xNDggLjE0Yy00Mi42Ni0zLjU4LTgwLjUyLTE4LjQ5LTEwMi4zNC01OC42OC0zMS44NC01OC42Ni02LjU4LTEyNS40NSA0OC4zNy0xNTIuMzJzMTIyLTEuODUgMTQ4IDU0LjY3YTExNC4yOCAxMTQuMjggMCAwIDEgNi4xNyAxOC4xNnM0LjIzLTUgNC45My01Ljc3YzIwLjQ2LTIxLjU3IDMzLjUzLTI5IDUzLjMyLTM5LjkyYTkxLjY5IDkxLjY5IDAgMCAxLTEzLjc4LTE2LjM2Yy0uNTctMS0xLTEuODEtMS4yMy0yLjEyLTIzLjE2LTM0LjMyLTI2LjcxLTg5LjgyIDkuMjQtMTMxLjg0QzM3NS41MiA2MS4yIDQ0Mi42OCA1Ni45MyA0OTAgOTUuNjZjMzEuODggMjYuMDggNTIuMTkgNzkuNTYgMjcuNjMgMTMxLjhsLS4wNy4xcy04LjU0IDE3LjkzLTIxLjc4IDMwYzE5Ljc5IDExIDMyLjg2IDE4LjM1IDUzLjMyIDM5LjkyLjcuNzQgNC44OCA1LjczIDQuOTMgNS43N2ExMTUuMyAxMTUuMyAwIDAgMSA2LjE3LTE4LjE2YzI1LjkyLTU2LjUyIDkzLTgxLjU0IDE0Ny45NS01NC42N3M4MC4yMyA5My42NiA0OC4zOSAxNTIuMzJ6Ii8+PC9zdmc+')",
                        bg: {
                            DEFAULT: "var(--ces-color-brand)",
                            hover: 'var(--ces-color-brand-strong)',
                            active: 'var(--ces-color-brand-stronger)',
                        },
                        border: {
                            DEFAULT: 'var(--ces-color-default-background)',
                            hover: 'var(--ces-color-default-background)',
                            active: 'var(--ces-color-default-background)',
                        },
                        text: {
                            DEFAULT: 'var(--ces-color-inverted-text)',
                            hover: 'var(--ces-color-inverted-text)',
                            active: 'var(--ces-color-inverted-text)',
                        },
                    }
                }
            }
        }
    }
}
