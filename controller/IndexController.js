
let articleModel = require("../model/ArticleModel")
let tagModel = require("../model/TagModel")

let marked = require("../lib/marked")

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
        res.content = marked(res.content)


        await ctx.render('article', {
            article: res
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
        await ctx.render('archive')
    }

    async book(ctx){
        await ctx.render('book')
    }

}

module.exports = ()=>{
    return new IndexController();
}