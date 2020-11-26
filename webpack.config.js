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
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
};