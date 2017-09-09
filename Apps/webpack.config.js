const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

function getPlugins(env) {

    const PRODUCTION = env && env.PROD;

    console.log('----> is production', PRODUCTION);

    return PRODUCTION ? [new BabiliPlugin({
            removeDebugger: true,
            mangle: {
                'topLevel': true
            },
            deadcode: true
        }, {
            comments: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ] : [];

}

module.exports = function (env) {
    return {
        entry: {
            menu: "./menu.app.js",
            maintenance: './maintenance.app.js'
        },
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "../Js")
        },
        plugins: getPlugins(env),
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader',
                            options: {
                                attrs: {
                                    id: 'id'
                                }
                            }
                        },
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
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff",
                    options: {
                        outputPath: "../Views/"
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "../Views/"
                    }
                }

            ]
        }
    }
}