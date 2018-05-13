let articleModel = require("../model/ArticleModel")
let tagModel = require("../model/TagModel")
let bookModel = require("../model/BookModel")

let Pagination = require("../lib/pagination")

let marked = require("../lib/marked")
let formatCatalogue = require("../lib/catelogue")

// let mongoCache = require('../core/Cache')


class IndexController {
    async index(ctx, next) {
        let page = ctx.params && ctx.params.page || 1;

        // 分页类
        let pageSize = 10;
        let articles = await articleModel.getArticles(pageSize, page - 1);
        let total = await articleModel.count();

        let pagination = new Pagination(total.total, page, "", pageSize);

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
    }

    async article(ctx, next) {

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

            data = {
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
    }

    async tags(ctx, next) {
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        ctx.state.data = {
            categories,
            tags
        }

        ctx.state.view = "tags"

        await next()

    }

    async archive(ctx, next) {
        let lists = [];
        let tag = ctx.params && ctx.params.tag;

        if (tag) {
            // 标签、分类归档
            lists = await articleModel.getArticleByTag(tag);
        } else {
            lists = await articleModel.getArchiveList();
        }

        let articleGroup = [];
        let cursor = 0;
        // 对归档按年份分组
        articleGroup[cursor] = {
            year: lists && lists[0] && lists[0].year,
            articles: []
        };

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
    }

    async book(ctx, next) {

        let books = await bookModel.getBooks();

        ctx.state.data = {
            books
        }

        ctx.state.view = "book"

        await next()
    }

}

module.exports = () => {
    return new IndexController();
}