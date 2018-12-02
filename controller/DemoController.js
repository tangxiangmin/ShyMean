class DemoController {
    async index(ctx, next){
        ctx.state.view = "demo"
        await next()
    }
}

module.exports = ()=>{
    return new DemoController()
}
