import {h, Component} from "nezha/dist/src";
import {Link} from "nezha/dist/router";
import {connect} from 'nezha/dist/nax'
import {getArticleList} from "../api";

import Pagination from "../components/pagination";

const Article = ({post}) => {
    return (<article class="article">
        <h2 class="article_hd">
            <Link href={`/article/${post.title}`} title={post.title} class="article_tt">
                {post.title}
            </Link>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"/>
            </span>
            <time>{post.created_at}</time>
            |<span class="hide-sm">分类于</span>
            <span class="show-sm"><i class="iconfont icon-tag"/></span>
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
        <Pagination total={total && total.total} router="/" current={parseInt(location.query.page, 10) || 1}/>
    </div>)
})

// @ts-ignore
Home.asyncData = async (store, location) => {
    let searchParams = {
        page: location.query.page
    }
    let result = await getArticleList(searchParams)
    store.dispatch({
        type: 'store_index_list',
        payload: {
            ...result,
            searchParams
        }
    })
}

export default Home
