module.exports = {
    devtool: 'source-map',
    entry: ['./src/app'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loaders: ['ts-loader']
        }]
    }
};