var path = require('path'),
    webpack = require('webpack');

var PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};

module.exports = {
    entry: path.join(PATHS.src, "rigby.js"),
    output: {
        path: PATHS.build,
        filename: "rigby.min.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};