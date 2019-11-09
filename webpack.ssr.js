/**
 * 2019/11/3 下午11:16
 */
const path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let pageExtractTextPlugin = new ExtractTextPlugin(`main.css`)

module.exports = {
    context: __dirname,
    entry: './ssr/client.tsx',
    output: {
        path: path.resolve(__dirname, './ssr/dist/'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: pageExtractTextPlugin.extract({
                    use: [
                        'css-loader?sourceMap',
                        "postcss-loader?sourceMap",
                        "sass-loader?sourceMap"
                    ]
                }),
            },

        ]
    },
    plugins: [
        pageExtractTextPlugin,
    ],
};
