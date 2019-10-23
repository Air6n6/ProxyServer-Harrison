const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/components', 'Gallery.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }   
                }
            },
            {
                test: /\.css$/i,
                use: 'style-loader'
            },
            {
                test: /\.css$/i,
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        ]
    },
 mode: 'development'
};