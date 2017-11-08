

class ProfileController {
    async about(ctx){
        await ctx.render("about")
    }

    async friend(ctx){
        await ctx.render("friend")
    }
}