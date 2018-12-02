/**
 * 2018/11/19 下午10:05
 */
let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let pageExtractTextPlugin = new ExtractTextPlugin("index.css");

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './bundle'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                // loader: "babel-loader?presets=env",
            },
            {
                test: /\.scss$/,
                use: pageExtractTextPlugin.extract({
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                }),
            },
            {
                test: /\.css$/,
                use: pageExtractTextPlugin.extract({
                    use: [
                        "css-loader",
                        "postcss-loader",
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
        pageExtractTextPlugin
    ],
    // 使用systemJS管理全局的cdn脚本，并注入webpack打包
    externals: {
        'SystemJS': 'window.System',
        'jquery': "window.jQuery",
        'swigjs': "window.swig",
        'highlight.js': "window.hljs"
    },
    devServer: {//配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, './'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 7999,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    }

}
