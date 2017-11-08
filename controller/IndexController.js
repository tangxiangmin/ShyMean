
let articleModel = require("../model/ArticleModel")

class IndexController {
    async index(ctx){
        let res = await articleModel.getArticles(10, 1);

        await ctx.render('index', {
            articles: res
        })
    }

    async tags(ctx){
        await ctx.render('tags')
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