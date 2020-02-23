/* global require __dirname module */
let path = require("path");

const port = process.env.WEBPACK_DEV_SERVER_PORT || 8080;

let conf = {
    entry: "./src",

    output: {
        path: path.resolve(__dirname, "./js"),
        filename: "main.js",
        publicPath: "js/"
    },
    devServer: {
        overlay: true,
        port
        //watchContentBase: true,
        //writeToDisk: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
                // exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: "css-loader"
            }
        ]
    }
};

module.exports = (env, options) => {
    conf.devtool =
        options.mode === "production" ? false : "cheap-module-eval-source-map";
    //"cheap-module-eval-source-map";

    return conf;
};
