const path = require("path")

const Koa = require("koa")
const app = new Koa()
const router = require("./router")

const views = require("koa-views")

const serve = require('koa-static')
app.use(serve(path.join(__dirname)))

const swigOptions = require("./lib/swig")

app.use(views(__dirname + '/views', {
    extension: "swig",
    // options: swigOptions
}))

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000);
