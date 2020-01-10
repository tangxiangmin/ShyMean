/**
 * 2018/12/2 上午11:57
 */
let fs = require("fs")

let isProduction = process.env.NODE_ENV === 'production' // 是否为生产环境
let isDevelopment = process.env.NODE_ENV === 'development' // 是否为开发环境

// 获取生产环境的资源路径
function getProdResource() {
    try {
        return require("../public/map.json")
    } catch (e) {
        console.log("未检测到webpack输出文件，执行npm run build:static")
        throw e;
    }
}

// 获取本地开发环境webpack资源路径
function getDevResource() {
    let webpackConfig = require("../../webpack.ssr.js")({development: true})
    let {port} = webpackConfig.devServer
    return {
        css: [`//localhost:${port}/client.css`],
        js: [`//localhost:${port}/client.js`]
    }
}

let staticResource = isProduction ? getProdResource() : getDevResource()

export {
    staticResource,
    isProduction,
    isDevelopment
}
