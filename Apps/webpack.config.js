const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
       menu: "./menu.app.js",
       maintenance: './maintenance.app.js'
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "../Js")
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader', options: { attrs: { id: 'id' } } },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader"
                }]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: { outputPath: "../Views/" } },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", options: { outputPath: "../Views/" } }

        ]
    }
}