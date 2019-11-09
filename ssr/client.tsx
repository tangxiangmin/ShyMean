/**
 * 2019/11/1 下午9:12
 * 浏览器入口文件，等待服务端响应完成之后，浏览器会接手html并进行脱水
 */
import {h, hydrateDOM, Component} from "nezha/dist/src";
import './assets/scss/blog.scss'

import App from './app'
import {createStore} from "./store";
// @ts-ignore
let store = createStore(window.INIT_DATA)

let globalContext = {
    store
}

// 与服务端保持相同的逻辑，路由切换时请求数据，
// 这里采取的策略是在路由切换之后再调用接口
const onRouteChange = async (from, to) => {
    let RouteComponent = to.type
    let {location} = to.props
    if (RouteComponent.asyncData) {
        await RouteComponent.asyncData(store, location)
    }
}

hydrateDOM(<App context={globalContext} onChange={onRouteChange}/>, document.getElementById("root"))




