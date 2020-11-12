const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/public/scripts', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: 'dist/styles/style.css'
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public', 'index.html'),
            filename: 'index.html',
        }),
    ]

}