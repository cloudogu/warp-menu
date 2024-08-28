module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-prefix-selector')({
            transform: (prefix, selector, prefixedSelector) => {
                const rootMatcher = ["html", "body", ":root", ":host"];
                if (rootMatcher.includes(selector)){
                    return "#warp-menu-root";
                }
                // Ensure the prefix is only applied to class selectors
                return selector.startsWith('.') ? `#warp-menu-root${selector}, #warp-menu-root ${selector}` : `#warp-menu-root ${selector}`;
            },
        }),
        require('postcss-rem-to-pixel')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ],
}
