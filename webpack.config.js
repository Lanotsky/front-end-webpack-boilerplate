const path = require('path');
const babel = require('babel-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.pug$/, use: ["pug-html-loader"]},
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "file-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            { 
                test: /\.(png|svg|jpg|gif|)$/, 
                use: ["file-loader"] 
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
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
        // new HtmlWebpackPlugin({
        //     minify: {
        //         collapseWhitespace: true
        //     },
        //     template: './src/index.pug'
        // }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            template: './src/index.html'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        }),
        new CleanWebpackPlugin(['dist']),
    ]
}