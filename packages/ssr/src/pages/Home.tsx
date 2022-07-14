import {computed} from "@shymean/react-vue";
import {Link,} from '@shymean/react-vue-router';

import {formatDate} from "../utils";
import {AsyncDataParams, IArticle} from "../typings";
import Pagination from "../components/Pagination";
import {useArticleStore} from "../store/article";
import {getCurrentLocationQuery} from "../utils/isomorphic";

type ArticleProps = {
    post: IArticle
}

const Article = ({post}: ArticleProps) => {
    return () => {
        return (<article class="article">
            <h2 class="article_hd">
                <Link href={`/article/${post.title}`} title={post.title} class="article_tt">
                    {post.title}
                </Link>
            </h2>
            <div class="article_info">
                <span class="hide-sm">发表于</span>
                <time>{formatDate(post.created_at)}</time>
                | <span class="hide-sm">分类于</span>
                {
                    post.categories.map((cate: string) => {
                        return <Link href={`/archive/${cate}`} title={cate} class="hover-highlight">{cate}</Link>
                    })
                }
            </div>
            <div class="article_ct" dangerouslySetInnerHTML={{__html: post.abstract}}/>
            <div class="article_ft">
                <Link href={`/article/${post.title}`} title="阅读全文" class="hover-highlight">阅读全文</Link>
            </div>
        </article>)
    }
}

const Home = () => {
    const store = useArticleStore()


    const articleList = computed(() => {
        return store.articleList
    })

    const total = computed(() => {
        return store.total
    })

    return () => {
        const locationQuery = getCurrentLocationQuery()
        const current = parseInt(locationQuery.page || 1, 10)
        return <div>
            <div>
                {
                    articleList.value.map((post: IArticle) => {
                        // @ts-ignore
                        return <Article post={post} key={post.id}/>
                    })
                }
            </div>

            <div>
                <Pagination total={total.value} router="/" current={current} size={10}/>
            </div>
        </div>
    }
}

Home.asyncData = async ({instance, location}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    const {page = 1} = location.query
    await store.fetchListByPage({page: parseInt(page, 10) || 1, size: 10})
}

export default Home
