var path = require("path");

module.exports = {
    entry: "./src/demo.jsx",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "demo-compiled.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|rigby\.js|rigby\.min.js/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};