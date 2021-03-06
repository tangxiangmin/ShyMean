/**
 * 2019/11/1 下午9:11
 * 服务器应用，响应浏览器请求，根据url渲染对应页面组件，然后返回
 */
require("@babel/register")(); // 支持tsx等

import {getMatchRouteConfig, createLocation} from "@shymean/nezha-router";

import {Component, h, renderHTML} from '@shymean/nezha'
import {releaseRouter} from '@shymean/nezha-router'

import App from './app'

import routes from "./routes";
import {createStore} from "./store";

import getTemplate from './template'

const express = require('express')
const path = require('path')
const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/*", async (req, res) => {
    let url = req.url
    if (url === '/favicon.ico') return res.end('')
    try {
        // step1 根据路由配置找到需要渲染的组件，并调用约定的asyncData方法获取组件初始化需要的数据
        let {component, path} = getMatchRouteConfig(url, routes)
        let store = createStore()
        let location = createLocation(url, path)
        // @ts-ignore
        let pageData = component.asyncData && await component.asyncData(store, location)
        // @ts-ignore
        // 处理单个页面的seo数据，启动传入的data为Home.asyncData方法获取到的返回值，方便根据页面内容动态处理tdk
        let seoData = component.serverSEO && await component.serverSEO(pageData)

        // step2 根据数据渲染完整的应用
        let vnode = (<App context={{store}} url={url}/>)
        let html = renderHTML(vnode)

        // step3 并将使用的数据埋入页面，返回给浏览器
        res.writeHead(200, {"Content-Type": "text/html"});
        let initData: any = store.getState()

        releaseRouter() // 由于renderHTML中并没有实现unmount相关逻辑，因此需要在SSR中手动释放实例化的Router
        let tpl: string = getTemplate(html, initData, seoData)
        res.end(tpl);
    } catch (e) {
        res.end('Something wrong...');
        throw e
    }
})


const port = 9876
app.listen(port);
console.log(`server listen at ${port}`)
