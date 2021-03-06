/**
 * 2019/11/3 下午11:16
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}) => {
    let isProduction = env.production
    let fileHash = isProduction ? "-[contenthash]" : ""
    let pageExtractTextPlugin = new MiniCssExtractPlugin({
        filename: `client${fileHash}.css`,
    })
    let plugins = [
        pageExtractTextPlugin
    ]

    if (env.report && isProduction) {
        new BundleAnalyzerPlugin()
    }
    return {
        // context: __dirname,
        devtool: isProduction ? '' : 'source-map',
        entry: {
            client: path.resolve(__dirname, './ssr/client.tsx'),
        },
        output: {
            path: path.resolve(__dirname, './ssr/public/bundle'),
            filename: `[name]${fileHash}.js`
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
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // publicPath: '../',
                                // hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader?sourceMap',
                        "postcss-loader?sourceMap",
                        "sass-loader?sourceMap"
                    ]
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
        externals: {
            'SystemJS': 'window.System',
            'highlight.js': "window.hljs"
        },
        plugins,
        optimization: isProduction ? {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        priority: 10 // 优先级
                    }
                }
            }
        } : {},
        devServer: {
            disableHostCheck: true,
            // contentBase: path.resolve(__dirname, './'),
            // host: 'localhost',
            port: 9877,
            compress: true,
        }
    }
}
