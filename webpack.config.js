const webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'build/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //             drop_debugger: true,
    //             drop_console: true
    //         }
    //     })
    // ],
}
