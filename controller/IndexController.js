
let articleModel = require("../model/ArticleModel")
let tagModel = require("../model/TagModel")
let bookModel = require("../model/BookModel")

let marked = require("../lib/marked")
let formatCatalogue = require("../lib/catelogue")

class IndexController {
    async index(ctx){
        let page = ctx.param && ctx.param.page || 1;

        // todo
        // 缓存
        // 分页类

        let articles = await articleModel.getArticles(10, page-1);
        let total = await articleModel.count();

        await ctx.render('index', {
            articles,
            total,
            page,
            pageSize: 10
        })
    }

    async article(ctx){

        let title = ctx.params.title;

        let res = await articleModel.getArticleByTitle(title)
        let prev = await articleModel.getPrevArticle(res.created_at)
        let next = await articleModel.getNextArticle(res.created_at)

        let htm = marked(res.content)

        let {catalogue, content } = formatCatalogue(htm)
        res.content = content


        await ctx.render('article', {
            article: res,
            catalogue,
            prev,
            next
        })
    }

    async tags(ctx){
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        let data = {
            categories,
            tags
        }

        // todo 根据前后端渲染返回不同的数据
        if (/^\/api/.test(ctx.request.url)){
            ctx.body = data;
        }else {
            await ctx.render('tags', data)
        }

    }

    async archive(ctx){
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

        await ctx.render('archive', {
            articleGroup,
            total: lists.length,
            tag
        })
    }

    async book(ctx){

        let books = await bookModel.getBooks();

        await ctx.render('book', {
            books
        })
    }

}

module.exports = ()=>{
    return new IndexController();
}