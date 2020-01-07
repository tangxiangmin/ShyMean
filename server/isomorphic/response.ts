// 此处同步开发环境变量 挂载模板需要的环境
// import renderData from '../build/render'

// 根据渲染方式返回接口的数据或渲染模板中间件
export default async function (ctx: any) {
    let url = ctx.request.url,
        data = ctx.state.data,
        params = ctx.query

    // 通过nginx配置cors
    // ctx.set("Access-Control-Allow-Origin", "*");
    // ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    // ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // ctx.set("Content-Type", "application/json;charset=utf-8");
    // ctx.set("Access-Control-Allow-Credentials", true);
    // ctx.set("Access-Control-Max-Age", 300);
    // ctx.set("Access-Control-Expose-Headers", "myData");

    ctx.body = data || {};

    //
    // let header = ctx.request.header || {};
    // // 异步请求增加async参数，避免被nginx缓存为模板cache
    // let isAsyncRequest = header['x-requested-with'] === 'XMLHttpRequest' && params.async === 'true'
    //
    // if (isAsyncRequest) {
    //     ctx.body = data || {};
    // } else {
    //     // 需要将路由映射到对应的模板，
    //     // 这里暂时约定通过ctx.state传递
    //     data = Object.assign({}, data, renderData)
    //     try {
    //         let tpl = ctx.state.view
    //         await ctx.render(tpl, data)
    //     } catch (e) {
    //         console.log(`模板渲染错误: ${url}`)
    //         // console.log(e)
    //         await ctx.render("404", data)
    //     }
    // }
}

