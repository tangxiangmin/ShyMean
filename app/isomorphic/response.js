// 此处同步开发环境变量 挂载模板需要的环境
let renderData = require('../build/render')

// 根据渲染方式返回接口的数据或渲染模板中间件
module.exports = async function (ctx) {
    let url = ctx.request.url,
        data = ctx.state.data,
        params = ctx.query

    let header = ctx.request.header || {};
    // 异步请求增加async参数，避免被nginx缓存为模板cache
    let isAsyncRequest = header['x-requested-with'] === 'XMLHttpRequest' && params.async === 'true'

    if (isAsyncRequest) {
        ctx.body = data;
    } else {
        // 需要将路由映射到对应的模板，
        // 这里暂时约定通过ctx.state传递
        data = Object.assign({}, data, renderData)
        try {
            let tpl = ctx.state.view || "404"
            tpl = "404"
            await ctx.render(tpl, data)
        } catch (e) {
            console.log("模板渲染错误...")
            console.log(e)
        }
    }
}

