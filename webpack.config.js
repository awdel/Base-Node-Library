const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const init = async (env, argv) => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/scripts.js'
        },
        devtool: argv.mode === 'development' ? 'source-map' : false,
        watch: argv.mode === 'development' ? true : false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)|(bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        {
                            loader: "eslint-loader"
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "postcss-loader",
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass")
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/styles.css"
            })
        ]
    };
};
module.exports = init;