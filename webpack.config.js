const webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'build/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //             drop_debugger: true,
    //             drop_console: true
    //         }
    //     }),
    //     new webpack.optimize.OccurrenceOrderPlugin(false)
    // ],
}
