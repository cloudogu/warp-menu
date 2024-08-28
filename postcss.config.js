module.exports = {
    plugins: [
        require('autoprefixer'),
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
