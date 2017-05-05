module.exports = {
    devtool: 'source-map',
    entry: './src/app',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            }
        ]
    }
};