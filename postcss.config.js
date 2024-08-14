module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-prefix-selector')({
            prefix: '#warp-menu-root ',
            transform: (prefix, selector, prefixedSelector) => {
                // Ensure the prefix is only applied to class selectors
                return selector.startsWith('.') ? prefixedSelector : selector;
            },
        }),
    ],
}
