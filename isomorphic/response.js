// 此处同步开发环境变量 挂载模板需要的环境
let renderData = require('../build/render')

// 根据渲染方式返回接口的数据或渲染模板中间件
module.exports = async function (ctx) {
    let url = ctx.request.url,
        data = ctx.state.data

    let header = ctx.request.header;
    let isAsyncRequest = header['x-requested-with'] === 'XMLHttpRequest'
    if (isAsyncRequest) {
        ctx.body = data;
    } else {
        // 需要将路由映射到对应的模板，
        // 这里暂时约定通过ctx.state传递
        data = Object.assign({}, data, renderData)
        await ctx.render(ctx.state.view, data)
    }
}

