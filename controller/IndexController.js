
let articleModel = require("../model/ArticleModel")
let tagModel = require("../model/TagModel")
let bookModel = require("../model/BookModel")

let marked = require("../lib/marked")
let formatCatalogue = require("../lib/catelogue")

class IndexController {
    async index(ctx){
        // todo
        // 缓存
        let res = await articleModel.getArticles(10, 1);

        // todo 自定义swig过滤器
        if (res && res.length){
            res.forEach(item=>{
                item.abstract = marked(item.abstract)
            })
        }

        await ctx.render('index', {
            articles: res
        })
    }

    async article(ctx){

        let title = ctx.params.title;
        let res = await articleModel.getArticleByTitle(title)
        let htm = marked(res.content)

        let {catalogue, content } = formatCatalogue(htm)
        res.content = content


        await ctx.render('article', {
            article: res,
            catalogue
        })
    }

    async tags(ctx){
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        await ctx.render('tags', {
            categories,
            tags
        })
    }

    async archive(ctx){
        let lists = await articleModel.getArchiveList();

        let articleGroup = [];
        let cursor = 0;
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
            total: lists.length
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