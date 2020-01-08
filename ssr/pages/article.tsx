import {h, Component} from "@shymean/nezha";
import {Link} from '@shymean/nezha-router'

import {connect} from '@shymean/nax'

import {getArticleDetail} from "../api";

import Comment from './message'
import Catalogue from '../components/catalogue'
import {formatDate} from '../util'
import marked from "../lib/marked";
import formatCatalogue from "../lib/catelogue";


const ArticleDetail = connect((state) => {
    return {
        ...state.article
    }
})(({article, catalogue, prev, next}) => {
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
                        <time>{formatDate(article.created_at)}</time> | <span class="hide-sm">分类于</span>
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

    let {article} = result
    if(article){
        let htm = marked(article.content)
        let {catalogue, content} = formatCatalogue(htm)
        article.content = content
        store.dispatch({
            type: 'store_article_detail',
            payload: {
                ...result,
                catalogue
            }
        })
    }
    return result
}

// @ts-ignore
ArticleDetail.serverSEO = async ({article}) => {

    return article ? {
        title: `${article.title}_shymean`,
        keywords: `${article.tags.join(",")},${article.categories.join(",")},shymean,前端开发,博客`,
        description: `${article.abstract}`
    } : {}

}

export default ArticleDetail
