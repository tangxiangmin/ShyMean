/**
 * 2019/11/1 下午9:11
 * 服务器应用，响应浏览器请求，根据url渲染对应页面组件，然后返回
 */
require("@babel/register")();

import {getMatchRouteConfig} from "nezha/dist/router/Router";
import {createLocation} from 'nezha/dist/router/location'

const express = require('express')
const path = require('path')
const app = express();

import App from './app'
import {Component, h, renderHTML} from 'nezha/src'
import routes from "./routes";
import {createStore} from "./store";

app.use(express.static(path.resolve(__dirname, "./dist")));

app.get("/*", async (req, res) => {
    let url = req.url
    if (url === '/favicon.ico') return res.end('')

    // step1 根据路由配置找到需要渲染的组件，并调用约定的asyncData方法获取组件初始化需要的数据
    let {component, path} = getMatchRouteConfig(url, routes)
    let store = createStore()
    let location = createLocation(url, path)
    // @ts-ignore
    component.asyncData && await component.asyncData(store, location)

    // step2 根据数据渲染完整的应用
    let vnode = (<App context={{store}} url={url}/>)
    let html = renderHTML(vnode)

    // step3 并将使用的数据埋入页面，返回给浏览器
    res.writeHead(200, {"Content-Type": "text/html"});
    let initData = store.getState()
    res.end(getTemplate(html, initData));
})


const port = 9876
app.listen(port);
console.log(`server listen at ${port}`)

// 返回完整的html模板，包括
// * 插入ssr渲染的html片段
// * 嵌入为客户端打包的相关文件
function getTemplate(html, initData) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_213036_i5ygl1uyx3q.css">
    <link rel="stylesheet" href="/main.css">
    <script type="systemjs-packagemap">
        {
          "packages": {
            "swig": "//cdn.bootcss.com/swig/1.4.2/swig.js",
            "jquery": "//cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
            "av": "//cdn1.lncld.net/static/js/3.0.4/av-min.js",
            "Valine": "//unpkg.com/valine/dist/Valine.min.js",
            "L2Dwidget": "//cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js"
          }
        }
    </script>
    <script src="//cdn.bootcss.com/systemjs/2.1.1/system.js"></script>
    
</head>
<body>
    <div id="root">${html}</div>
    <script>window.INIT_DATA = ${JSON.stringify(initData)}</script>
    <script src="/main.js"></script>
</body>
</html>`
}
