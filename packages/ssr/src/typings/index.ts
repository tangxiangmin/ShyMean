import {RouteLocation} from "@shymean/react-vue-router";
import {StoreInstance} from "../../../../../react-vue/packages/store";

export interface IArticle {
    id: number,
    title: string,
    created_at: string,
    categories: string[],
    content: string,
    tags: string[],
    abstract: string,
    catalogue: any

}

export interface IArticleListResponse {
    articles: IArticle[],
    page: number,
    total: number
}

export interface IArticleDetailResponse {
    article: IArticle,
    next: { title: string },
    prev: { title: string },
    title: string
}


export interface IArticleGroup {
    year: number,
    articles: IArticle[]
}

export interface IArchive {
    total: number,
    tag?: string,
    articleGroup: IArticleGroup[]
}

export interface ITag {
    name: string,
    id: number,
    num: number
}


export interface IBook {
    name: string,
    note: string,
    created_at: string,
    ended_at: string
}

export interface IFriendLink {
    id: number,
    link: string,
    name: string,
    slogan: string
}

export interface IDemoItem {
    name: string,
    desc: string,
    docUrl?: string,
    githubUrl?: string,
    previewUrl?: string,
}


export type AsyncDataParams = { instance: StoreInstance, location: RouteLocation }
export type AsyncDataFunc = ({instance, location}: AsyncDataParams) => any

export type AsyncSeoFunc = ({instance, location}: AsyncDataParams) => ITDKData | undefined

export type ServerComponent = Function & {
    asyncData?: AsyncDataFunc,
    asyncSEO?: AsyncSeoFunc
}


export enum PROVIDE_KEY {
    storeInstance = 'instance',
    currentLocation = 'currentLocation'
}

export interface ITDKData {
    title: string,
    description: string,
    keywords: string
}
