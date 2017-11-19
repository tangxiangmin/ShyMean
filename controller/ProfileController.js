
// todo 提取一个公共的静态页面方法

class ProfileController {
    async about(ctx, next){
        ctx.state.view = "about"
        await next()
    }

    async friend(ctx, next){
        ctx.state.view = "friend"

        await next()
    }

    async message(ctx, next){
        ctx.state.view = "message"
        await next()
    }
}

module.exports = ()=>{
    return new ProfileController()
}