/**
 * 2018/12/2 上午11:57
 */


let isProduction = process.env.NODE_ENV === 'production' // 是否为生产环境
let isDevelopment = process.env.NODE_ENV === 'development' // 是否为开发环境

module.exports = {
    isProduction,
    isDevelopment
}
