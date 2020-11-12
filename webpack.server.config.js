const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/server', 'server.js'),
    output: {
        path: path.join(__dirname, 'dist/server'),
        filename: 'server.js'
    },
    
    target: "node",

    node: {
        __dirname: false,
        __filename: false,
    },

    externals: [webpackNodeExternals()],

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }]
    },

    plugins: [
        new copyPlugin([
            {
                from: 'src/server/db',
                to: 'db/[name].[ext]',
                toType: 'template'
            }
        ])
    ]
}