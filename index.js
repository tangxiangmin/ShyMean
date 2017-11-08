const Koa = require("koa")

const app = new Koa()
const router = require("./router")
const views = require("koa-views")

app.use(views(__dirname + '/views', {
    extension: "ejs"
}))

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000);