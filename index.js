const path = require("path")

const Koa = require("koa")
const app = new Koa()
const router = require("./router")

const views = require("koa-views")

const serve = require('koa-static')
app.use(serve(path.join(__dirname)))

// 全局自定义过滤器
let filters = require("./lib/swig")
let swig = require("swig")

for(let key in filters){
    swig.setFilter(key, filters[key])
}



app.use(views(__dirname + '/views', {
    extension: "swig",
    // options: swigOptions
}))

app.use(async function(ctx, next){
    console.log("recive")
    await next()
})

app.use(router.routes())
    .use(router.allowedMethods())


let response = require("./isomorphic/response")

app.use(response)

app.listen(3000)
