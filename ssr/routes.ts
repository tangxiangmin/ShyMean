/**
 * 2019/11/1 下午9:11
 * 一份前后台共用的路由配置，
 */
import {RouteConfig} from "@shymean/nezha-router";

import About from './pages/about'
import Home from './pages/home'
import Version from './pages/version'
import Demo from './pages/demo'
import Tags from './pages/tags'
import Archive from "./pages/archive";
import BookList from "./pages/book";
import Friend from "./pages/friend";
import ArticleDetail from './pages/article'

import Message from './pages/message'

import Page404 from './pages/404'

const routes: Array<RouteConfig> = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/version', component: Version},
    {path: '/demo', component: Demo},
    {path: '/tags', component: Tags},
    {path: '/tags/:name', component: Archive},
    {path: '/archive', component: Archive},
    {path: '/archive/:name', component: Archive},
    {path: '/book', component: BookList},
    {path: '/friend', component: Friend},
    {path: '/message', component: Message},
    {path: '/article/:title', component: ArticleDetail},

    {component: Page404}
]

export default routes
