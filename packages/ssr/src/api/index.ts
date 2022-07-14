import http, {BaseResponse} from '../utils/request'
import {IArchive, IArticleDetailResponse, IArticleListResponse, IBook, IFriendLink, ITag} from "../typings";

// 获取文章列表
export const getArticleList = (params: { page: number } = {page: 1}) => {
    let url = `/${params.page}`
    return http.get<any, BaseResponse<IArticleListResponse>>(url, {params})
}

// 获取文章详情
export const getArticleDetail = (title: string) => {
    return http.get<any, BaseResponse<IArticleDetailResponse>>(`/article/${title}`)
}

// 获取标签列表
export const getTags = () => {
    return http.get<any, BaseResponse<{ tags: ITag[], categories: ITag[] }>>('/tags')
}

// 获取归档文章列表
export const getArchiveList = (params: { name: string }) => {
    let {name} = params
    let url = `/archive`
    if (name) url += `/${name}` // 获取某个标签的列表

    return http.get<any, BaseResponse<IArchive>>(url, {params})
}

// 获取阅读书籍列表
export const getBookList = () => {
    return http.get<any, BaseResponse<{ books: IBook[] }>>('/book')
}

export const getFriendList = () => {
    return http.get<any, BaseResponse<{ list: IFriendLink[] }>>('/friends')
}
