

class IndexController {
    async index(ctx){
        ctx.body = "Hello index"
    }
}

module.exports = ()=>{
    return new IndexController();
}