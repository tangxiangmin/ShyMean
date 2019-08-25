/**
 * 2018/11/19 下午10:05
 */
let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
    let isProduction = env && env.production
    let fileHash = isProduction ? "-[chunkhash:6]" : ""

    let pageExtractTextPlugin = new ExtractTextPlugin(`index${fileHash}.css`)

    return {
        devtool: isProduction ? '' : 'source-map',
        entry: {
            index: path.resolve(__dirname, './index.js'),
        },
        output: {
            path: path.resolve(__dirname, '../public/bundle'),
            filename: `[name]${fileHash}.js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
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
                {
                    test: /\.(png|jpg|jpeg|svg)/,
                    use: {loader: "url-loader", options: {limit: 8192}}
                },
                {
                    test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                }
            ]
        },
        plugins: [
            pageExtractTextPlugin,
        ],
        // 使用systemJS管理全局的cdn脚本，并注入webpack打包
        externals: {
            'SystemJS': 'window.System',
            'jquery': "window.jQuery",
            'swigjs': "window.swig",
            'highlight.js': "window.hljs"
        },
        devServer: {//配置此静态文件服务器，可以用来预览打包后项目
            contentBase: path.resolve(__dirname, './'),
            host: 'localhost',
            port: 8080,
            compress: true,
        }

    }

}
