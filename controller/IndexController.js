

class IndexController {
    async index(ctx){
        ctx.body = "Hello index"
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