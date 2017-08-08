const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: ["./menu.app.js"],
    output: {
        filename: "menu.js",
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
            }
        ]
    }
}