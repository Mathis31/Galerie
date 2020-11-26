const path = require("path"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = { 
    entry: "./index.js", 
    output: { 
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    }, 
    mode: 'development',
    devServer: { 
        contentBase: "./dist", 
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ] 
};