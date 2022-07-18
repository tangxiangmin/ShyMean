import {createStoreInstance, defineStore, StoreInstance} from "@shymean/react-vue-store";
import {getArchiveList, getArticleList, getTags, getBookList, getFriendList, getArticleDetail} from "../api";
import {IArchive, IArticle, IBook, ITag, IFriendLink} from "../typings";
import marked from "../utils/marked";
import formatCatalogue from "../utils/catelogue";
import {getCurrentStoreInstance, getStoreInitData} from "../utils/isomorphic";

export const instance = createStoreInstance()

type ArticleState = {
    articleList: IArticle[],
    currentArchive: IArchive | null
    total: number,
    tags: ITag[],
    categories: ITag[],
    books: IBook[],
    friendLinks: IFriendLink[],
    currentArticle: IArticle | null,
}

const useRawArticleStore = defineStore({
    id: 'article',
    instance: instance,
    state(): ArticleState {

        const initData = getStoreInitData()

        return {
            articleList: [],
            total: 0,
            tags: [],
            categories: [],
            books: [],
            currentArchive: null,
            currentArticle: null,
            friendLinks: [],
            ...initData
        }
    },
    actions: {
        async fetchListByPage(params: { page: number, size: number }) {
            const {data} = await getArticleList(params)
            data.articles.forEach(row=>{
                row.abstract =  marked(row.abstract)
            })
            this.articleList = data.articles
            this.total = data.total
        },

        async fetchArticleDetail({title}: { title: string }) {
            let {data} = await getArticleDetail(title)

            let {article} = data
            if (article) {
                try {
                    let htm = marked(article.content)
                    let {catalogue, content} = formatCatalogue(htm)
                    article.content = content
                    article.catalogue = catalogue
                    this.currentArticle = article
                } catch (e) {
                    this.currentArticle = null
                }

            }
        },

        async fetchArchive({name = ''}) {
            const {data} = await getArchiveList({name})
            this.currentArchive = data
        },

        async fetchTags() {
            const {data} = await getTags()
            const {tags, categories} = data
            this.tags = tags
            this.categories = categories
        },

        async fetchBooks() {
            const {data} = await getBookList()
            this.books = data.books
        },

        async fetchFriendLinks() {
            const {data} = await getFriendList()
            this.friendLinks = data.list
        }
    }
})

export const useArticleStore = (instance?: StoreInstance) => {
    if (!instance) {
        instance = getCurrentStoreInstance()
    }
    return useRawArticleStore(instance)
}
