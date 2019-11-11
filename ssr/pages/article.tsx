import {h, Component} from "nezha/dist/src";
import {Link} from 'nezha/dist/router'

import {connect} from 'nezha/dist/nax'

import {getArticleDetail} from "../api";

import Comment from './message'
import Catalogue from '../components/catalogue'

const ArticleDetail = connect((state) => {
    return {
        ...state.article
    }
})(({article,catalogue, prev, next}) => {
    // todo 实现重定向错误
    if (!article) {
        return (<div>Oops...加载中</div>)
    }

    return (
        <div>
            <article class="article article-detail">
                <header class="text-center">
                    <h2 class="article_hd">{article.title}</h2>
                    <div class="article_info">
                        <span class="hide-sm">发表于</span>
                        <span class="show-sm">
                <i class="iconfont icon-archives"/>
            </span>
                        <time>{article.created_at}</time>
                        |
                        <span class="hide-sm">分类于</span>
                        <span class="show-sm"><i class="iconfont icon-tag"/></span>
                        {
                            Array.isArray(article.categories) && article.categories.map(cate => {
                                return <Link href={`/archive/${cate}`} class="hover-highlight">{cate}</Link>
                            })
                        }
                    </div>
                </header>
                <div class="article_ct" dangerouslyInnerHTML={article.content}/>
                <footer class="article_ft">
                    {
                        Array.isArray(article.tags) && article.tags.map(tag => {
                            return <Link href={`/archive/${tag}`} class="article_tag">#{tag}</Link>
                        })
                    }
                </footer>

                <div class="article_nav">
                    {
                        prev &&
                        <Link href={`/article/${prev.title}`} class="hover-highlight article_prev">{prev.title}</Link>
                    }
                    {
                        next &&
                        <Link href={`/article/${next.title}`} class="hover-highlight article_next">{next.title}</Link>
                    }
                </div>
            </article>
            <Catalogue data={catalogue}/>
            <Comment/>
        </div>)
})

// @ts-ignore
ArticleDetail.asyncData = async (store, location) => {
    let result = await getArticleDetail(location.params.title)
    store.dispatch({
        type: 'store_article_detail',
        payload: result
    })
}

export default ArticleDetail
