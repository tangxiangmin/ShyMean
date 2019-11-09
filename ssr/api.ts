/*
    对于服务端而言，需要连接数据库获取数据
    对于浏览器而言，需要通过ajax请求http接口获取数据
    使用axios，可以绕开浏览器和服务端的网络请求差异，减少同构工作量
 */
import axios from 'axios'

// axios.defaults.baseURL = 'http://www.shymean.com/api/'
axios.defaults.baseURL = 'http://localhost:3000/'

// todo 公共的拦截器

// 获取首页文章列表
export const getArticleList = async (params) => {
    let result = await axios.get('/', {params})
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


