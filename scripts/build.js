/**
 * 2019/1/6 下午5:11
 * 获取webpack输出的文件名，替换模板页面静态资源文件路径
 */

let webpack = require('webpack')
let fs = require("fs")
let path = require("path")

let config = require("../static/webpack.config")({production: true})
const bundler = webpack(config)


function getOutputFileName(assets) {

    let entryScriptRe = /^index-.*\.js$/
    let entryStyleRe = /^index-.*?\.css$/

    let outputFile = {
        js: "",
        css: ""
    }
    for (let i = 0; i < assets.length; i++) {
        let asset = assets[i].name
        if (entryScriptRe.test(asset)) {
            outputFile.js = asset
        }
        if (entryStyleRe.test(asset)) {
            outputFile.css = asset
        }
    }
    return outputFile
}

function getOutputFilePath(outputFile, outputPath) {
    // 服务器根目录
    let serveRoot = path.resolve(__dirname, "../public")

    Object.keys(outputFile).forEach(key => {
        let val = outputFile[key]
        let absPath = outputPath + '/' + val
        outputFile[key] = absPath.replace(serveRoot, "")
    })
    return outputFile
}

function createOutputMap(outputFile) {
    let mapPath = path.resolve(__dirname, "../app/build/map.json")

    fs.writeFile(mapPath, JSON.stringify(outputFile), function (err) {
        if (err) throw err;
        console.log(`打包完成，成功生成${mapPath}`)
    })
}

bundler.run((err, stats) => {
    let assets = stats.toJson().assets

    let outputFile = getOutputFileName(assets)
    outputFile = getOutputFilePath(outputFile, config.output.path)

    createOutputMap(outputFile)
})
