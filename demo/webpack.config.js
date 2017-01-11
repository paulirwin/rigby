module.exports = {
    entry: "./src/demo.jsx",
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: "./dist",
        filename: "demo-compiled.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};