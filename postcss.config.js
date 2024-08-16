module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-prefix-selector')({
            transform: (prefix, selector, prefixedSelector) => {
                // Ensure the prefix is only applied to class selectors
                return selector.startsWith('.') ? `#warp-menu-root${selector}, #warp-menu-root ${selector}` : selector;
            },
        }),
    ],
}
