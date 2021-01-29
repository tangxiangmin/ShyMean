import {h, Component} from "@shymean/nezha";
import {Link} from "@shymean/nezha-router";
import {connect} from '@shymean/nax'
import {getArticleList} from "../api";

import Pagination from "../components/pagination";
import {formatDate} from '../util'
import marked from "../lib/marked";

const Article = ({post}) => {
    return (<article class="article">
        <h2 class="article_hd">
            <Link href={`/article/${post.title}`} title={post.title} class="article_tt">
                {post.title}
            </Link>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <time>{formatDate(post.created_at)}</time> | <span class="hide-sm">分类于</span>
            {
                post.categories.map(cate => {
                    return <Link href={`/archive/${cate}`} title={cate} class="hover-highlight">{cate}</Link>
                })
            }
        </div>
        <div class="article_ct" dangerouslyInnerHTML={post.abstract}/>
        <div class="article_ft">
            <Link href={`/article/${post.title}`} title="阅读全文" class="hover-highlight">阅读全文</Link>
        </div>
    </article>)
}

const Home = connect((state) => {
    return {
        ...state.home
    }
})(({articles = [], total, page, location}) => {
    return (<div>
        {
            articles.map(post => {
                return <Article post={post}/>
            })
        }
        <Pagination total={total} router="/" current={parseInt(location.query.page, 10) || 1}/>
    </div>)
})

// @ts-ignore
Home.asyncData = async (store, location) => {
    let searchParams = {
        page: location.query.page
    }
    let result = await getArticleList(searchParams)

    let {articles} = result

    Array.isArray(articles) && articles.forEach(item => {
        item.abstract = marked(item.abstract)
    })
    store.dispatch({
        type: 'store_index_list',
        payload: {
            ...result,
            searchParams
        }
    })
    return result
}

// @ts-ignore

// Home.serverSEO = async (data) => {
//     return {
//         title: '',
//         description: '',
//         keywords: ''
//     }
// }

export default Home
