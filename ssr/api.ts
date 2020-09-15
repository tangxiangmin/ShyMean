/*
    对于服务端而言，需要连接数据库获取数据
    对于浏览器而言，需要通过ajax请求http接口获取数据
    使用axios，可以绕开浏览器和服务端的网络请求差异，减少同构工作量
    由于之前的同构渲染服务器直接提供了查询接口，使用axios也可以避免重写服务端数据查询逻辑
 */
import axios from 'axios'

let isBrowser = typeof window !== 'undefined'
let isDev = process.env.NODE_ENV === 'development'
// 通过nginx转发到server服务,port:3000,  server端服务使用内网域名，减少cdn查询延迟
axios.defaults.baseURL = isBrowser && !isDev ? `//${location.hostname}/api/` : `http://localhost:3000/`
// axios.defaults.baseURL = 'http://localhost:3000/'
// todo 公共的拦截器

// 获取首页文章列表
export const getArticleList = async (params) => {
    let url = `/${params.page || 1}`

    let result = await axios.get(url, {params})
    return result.data
}

// 获取文章详情
export const getArticleDetail = async (title) => {
    let result = await axios.get(`/article/${title}`, {})
    return result.data
}

// 获取标签列表
export const getTags = async (params) => {
    let result = await axios.get('/tags', {params})
    return result.data
}

// 获取归档文章列表
export const getArchiveList = async (params) => {
    let {name} = params
    let url = `/archive`
    if (name) url += `/${name}` // 获取某个标签的列表

    let result = await axios.get(url, {params})
    return result.data
}

// 获取阅读书籍列表
export const getBookList = async (params) => {
    let result = await axios.get('/book', {params})
    return result.data
}


