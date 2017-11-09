

class ProfileController {
    async about(ctx){
        await ctx.render("about")
    }

    async friend(ctx){
        await ctx.render("friend")
    }

    async message(ctx){
        await ctx.render("message")
    }
}

module.exports = ()=>{
    return new ProfileController()
}