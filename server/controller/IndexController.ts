import articleModel from "../model/article"
import tagModel from "../model/tag"
import bookModel from "../model/book"
import logger from '../util/logger'


import Pagination from "../lib/pagination"
import marked from "../lib/marked"
import formatCatalogue from "../lib/catelogue"

export default {
    async index(ctx: any, next: Function) {
        let page = ctx.params && ctx.params.page || 1;

        // 分页类
        let pageSize = 10;
        let articles = await articleModel.getArticles(pageSize, page - 1);

        let total = await articleModel.count();
        let pagination = new Pagination(total.total, page, "", pageSize);

        // @ts-ignore
        articles.forEach(item => {
            item.abstract = marked(item.abstract)
        })

        ctx.state.data = {
            articles,
            total,
            page,
            pageSize,
            pagination: pagination.init()
        }

        ctx.state.view = "index"

        await next();
    },

    async article(ctx: any, next: () => void) {

        let title = ctx.params.title;

        // todo 缓存有效期
        // let data = await mongoCache.getArticle({title})


        // if (!data) {
        let res = await articleModel.getArticleByTitle(title)

        let prevArticle = await articleModel.getPrevArticle(res.created_at)
        let nextArticle = await articleModel.getNextArticle(res.created_at)

        let htm = marked(res.content)

        let {catalogue, content} = formatCatalogue(htm)
        res.content = content

        let data = {
            title,
            article: res,
            catalogue,
            prev: prevArticle,
            next: nextArticle
        }

        // await mongoCache.saveArticle(data)
        // }

        ctx.state.data = data

        ctx.state.view = "article"

        await next()
    },

    async tags(ctx: any, next: () => void) {
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        logger.info(categories, tags)
        ctx.state.data = {
            categories,
            tags
        }

        ctx.state.view = "tags"

        await next()

    },

    async archive(ctx: any, next: () => void) {
        let lists = [];
        let tag = ctx.params && ctx.params.tag;

        if (tag) {
            // 标签、分类归档
            lists = await articleModel.getArticleByTag(tag);
        } else {
            lists = await articleModel.getArchiveList();
        }

        let articleGroup: any[] = [];
        let cursor = 0;
        // 对归档按年份分组
        articleGroup[cursor] = {
            year: lists && lists[0] && lists[0].year,
            articles: []
        };

        // @ts-ignore
        lists.forEach((val) => {
            if (val.year !== articleGroup[cursor].year) {
                cursor++;
                articleGroup[cursor] = {
                    year: val.year,
                    articles: [val]
                };
            } else {
                articleGroup[cursor].articles.push(val);
            }
        });

        ctx.state.data = {
            articleGroup,
            total: lists.length,
            tag
        }
        ctx.state.view = "archive"

        await next();
    },

    async book(ctx: any, next: () => void) {

        let books = await bookModel.getBooks();

        ctx.state.data = {
            books
        }

        ctx.state.view = "book"

        await next()
    }

}
