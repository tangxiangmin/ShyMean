class FragmentController {
    async list(ctx, next) {
        ctx.state.view = "fragment"
        await next()
    }
}

module.exports = new FragmentController()
