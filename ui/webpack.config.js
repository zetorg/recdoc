'use strict';

var path = require('path');
var webpack = require('webpack');
var ReplacePlugin = require("./ForkReplacePlugin/");

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, '../public', 'js'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        publicPath: 'http://localhost:8080/public/js/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style/useable!css!autoprefixer?browsers=last 5 version!'
            },
            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer?browsers=last 5 version!less!'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-1'
                    ]
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'file'
            }
        ]
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'js')
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        new ReplacePlugin({
            skip: process.env.NODE_ENV == 'production',
            entry: 'mane.blade.php',
            output: '../resources/views/layouts/mane.blade.php'
        })
    ]
};
