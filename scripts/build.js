/**
 * 2019/1/6 下午5:11
 * 获取webpack输出的文件名，替换模板页面静态资源文件路径
 */

let webpack = require('webpack')
let fs = require("fs")
let path = require("path")

let config = require("../webpack.ssr.js")({production: true})
const bundler = webpack(config)

function getOutputFileName(assets) {

    let scriptRe = /\.js$/
    let styleRe = /\.css$/

    let outputFile = {
        js: [],
        css: []
    }

    for (let i = 0; i < assets.length; i++) {
        let asset = assets[i].name
        if (scriptRe.test(asset)) {
            // client在最后，保证依赖正确
            if(asset.indexOf('client') === 0){
                outputFile.js.push(asset)
            }else {
                outputFile.js.unshift(asset)
            }
        }
        if (styleRe.test(asset)) {
            outputFile.css.push(asset)
        }
    }
    return outputFile
}

function getOutputFilePath(outputFile, outputPath) {
    // 服务器根目录
    let serveRoot = path.resolve(__dirname, "../ssr/public/")

    // 配置CDN源站和回源HOST，类似于publicPath
    let cdnHost = '//cdn.shymean.com'
    Object.keys(outputFile).forEach(key => {
        let assets = outputFile[key]

        outputFile[key] = assets.map(name=>{
            let absPath = outputPath + '/' + name
            return cdnHost + absPath.replace(serveRoot, "")
        })
    })
    return outputFile
}

function createOutputMap(outputFile) {
    let mapPath = path.resolve(__dirname, "../ssr/public/map.json")

    fs.writeFile(mapPath, JSON.stringify(outputFile), function (err) {
        if (err) throw err;
        console.log(`打包完成，成功生成${mapPath}`)
    })
}

bundler.run((err, stats) => {
    if (err) throw err
    let assets = stats.toJson().assets

    let outputFile = getOutputFileName(assets)
    outputFile = getOutputFilePath(outputFile, config.output.path)

    createOutputMap(outputFile)
})
