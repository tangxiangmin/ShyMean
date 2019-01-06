
const path = require("path")

const Koa = require("koa")
const app = new Koa()

let server = {
    start(){
        console.log('当前运行环境:' + process.env.NODE_ENV)

        this.initStatic()
        this.initTplEngine()
        this.initRouter()
        this.initIsomorphic()

        app.listen(3000)
        console.log('server listen at 3000')
    },
    initStatic(){
        const serve = require('koa-static')
        let staticPath = [
            path.resolve(__dirname, "../public"),
            path.resolve(__dirname, "./favicon.ico"),
        ];

        staticPath.forEach(staticUrl => {
            app.use(serve(staticUrl))
        })
    },
    initTplEngine(){
        const views = require("koa-views")

        // 全局自定义过滤器
        let filters = require("./lib/swig")
        let swig = require("swig")

        for (let key in filters) {
            swig.setFilter(key, filters[key])
        }
        app.use(views(path.resolve(__dirname, '../views'), {
            extension: "swig",
            // options: swigOptions
        }))
    },
    initRouter(){
        const router = require("./router")

        app.use(router.routes())
            .use(router.allowedMethods())
    },
    initIsomorphic(){
        let response = require("./isomorphic/response")
        app.use(response)
    }
}
server.start()

