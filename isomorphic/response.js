// 根据渲染方式返回接口的数据或渲染模板中间件


let tpls = require("./tpls")

module.exports = async function(ctx){
    let url = ctx.request.url,
        data = ctx.state.data

    let header = ctx.request.header;

    if (header['x-requested-with'] === 'XMLHttpRequest'){

        ctx.body = data;

    }else {
        // todo
        // 需要将路由映射到对应的模板，
        // 这里暂时约定通过ctx.state传递

        await ctx.render(ctx.state.view, data)
    }
}

