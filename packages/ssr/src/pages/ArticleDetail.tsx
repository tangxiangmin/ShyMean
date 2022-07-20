import {computed} from "@shymean/react-vue";
import {Link} from '@shymean/react-vue-router'
import {formatDate} from "../utils";
import {useArticleStore} from "../store/article";
import Catalogue from "../components/Catalogue";
import MessageBoard from "./MessageBoard";
import {AsyncDataParams, ServerComponent} from "../typings";


const ArticleDetail: ServerComponent = () => {
    const store = useArticleStore()

    const articleDetail = computed(() => {
        return store.currentArticle
    })

    return () => {
        const article = articleDetail.value
        if (!article) {
            return (<div>Oops...加载中</div>)
        }
        const {catalogue} = article

        return (
            <div>
                <article class="article article-detail">
                    <header class="text-center">
                        <h2 class="article_hd">{article.title}</h2>
                        <div class="article_info">
                            <span class="hide-sm">发表于</span>
                            <time>{formatDate(article.created_at)}</time>
                            | <span class="hide-sm">分类于</span>
                            {
                                Array.isArray(article.categories) && article.categories.map(cate => {
                                    return <Link href={`/archive/${cate}`} class="hover-highlight">{cate}</Link>
                                })
                            }
                        </div>
                    </header>
                    <div class="article_ct" dangerouslySetInnerHTML={{__html: article.content}}/>
                    <footer class="article_ft">
                        {
                            Array.isArray(article.tags) && article.tags.map(tag => {
                                return <Link href={`/archive/${tag}`} class="article_tag">#{tag}</Link>
                            })
                        }
                    </footer>

                    <div class="article_nav">

                    </div>
                </article>
                <Catalogue data={catalogue}/>
                <MessageBoard/>
            </div>)
    }
}

ArticleDetail.asyncData = async ({instance, location}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    const {title} = location.params
    await store.fetchArticleDetail({title})
}

ArticleDetail.asyncSEO = ({instance}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    const article = store.currentArticle
    if (!article) return

    return {
        title: `${article.title}_shymean`,
        keywords: `${article.tags.join(",")},${article.categories.join(",")},shymean,前端开发,博客`,
        description: `${article.abstract}`
    }
}

export default ArticleDetail
