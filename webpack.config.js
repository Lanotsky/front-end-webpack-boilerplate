const path = require('path');
const babel = require('babel-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
          ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "main.css",
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: "demo",
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        })
    ]
}