
let articleModel = require("../model/ArticleModel")
let tagModel = require("../model/TagModel")
let bookModel = require("../model/BookModel")

let marked = require("../lib/marked")
let formatCatalogue = require("../lib/catelogue")

class IndexController {
    async index(ctx, next){
        let page = ctx.param && ctx.param.page || 1;

        // todo
        // 缓存
        // 分页类

        let articles = await articleModel.getArticles(10, page-1);
        let total = await articleModel.count();

        ctx.state.data = {
            articles,
            total,
            page,
            pageSize: 10
        }
        ctx.state.view = "index"

        await next();
    }

    async article(ctx, next){

        let title = ctx.params.title;

        let res = await articleModel.getArticleByTitle(title)
        let prev = await articleModel.getPrevArticle(res.created_at)
        let next = await articleModel.getNextArticle(res.created_at)

        let htm = marked(res.content)

        let {catalogue, content } = formatCatalogue(htm)
        res.content = content

        ctx.state.data = {
            article: res,
            catalogue,
            prev,
            next
        }

        ctx.state.view = "article"

        await next()
    }

    async tags(ctx, next){
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        ctx.state.data = {
            categories,
            tags
        }

        ctx.state.view = "tags"

        await next()

    }

    async archive(ctx, next){
        let lists = [];
        let tag = ctx.params && ctx.params.tag;

        if (tag){
            // 标签、分类归档
            lists = await articleModel.getArticleByTag(tag);
        }else {
            lists = await articleModel.getArchiveList();
        }

        let articleGroup = [];
        let cursor = 0;
        // 对归档按年份分组
        articleGroup[cursor] = {
            year: lists && lists[0] && lists[0].year,
            articles: []
        };

        lists.forEach((val)=>{
            if (val.year !== articleGroup[cursor].year){
                cursor++;
                articleGroup[cursor] = {
                    year: val.year,
                    articles: [val]
                };
            }else {
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

    async book(ctx, next){

        let books = await bookModel.getBooks();

        ctx.state.data = {
            books
        }

        ctx.state.view = "book"

        await next()
    }

}

module.exports = ()=>{
    return new IndexController();
}