// 参考：https://cn.vitejs.dev/guide/ssr.html
import fs from 'fs'
import path from 'path'
import express from 'express'
import {createRequire} from 'module';

import {createServer as createViteServer} from 'vite'

const require = createRequire(import.meta.url);
const __dirname = path.resolve();

const development = process.env.NODE_ENV === 'development'

if (!development) {
// entry-server 输出文件中依赖require，这里需要全局注册一个
    global.require = require
}

async function createServer() {
    const app = express()

    // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
    // 并让上级服务器接管控制
    const vite = await createViteServer({
        server: {
            middlewareMode: true,
            hmr: development
        },
        appType: 'custom'
    })
    // 使用 vite 的 Connect 实例作为中间件
    app.use(vite.middlewares)


    const port = 3001
    app.listen(port)

    console.log('ssr server listen at', port)

    app.use(express.static(path.resolve(__dirname, "./dist/client/assets")));

    app.use('/*', async (req, res, next) => {
        const url = req.originalUrl
        if (url === '/favicon.ico') return res.end('')

        try {
            const filePath = development ? path.resolve(__dirname, 'index.html') : path.resolve(__dirname, 'dist/client/index.html')
            let template = fs.readFileSync(filePath, 'utf-8')

            let render
            if (development) {
                template = await vite.transformIndexHtml(url, template)  // 注入热更新等逻辑
                const {render: devRender} = await vite.ssrLoadModule('/src/entry-server.tsx')
                render = devRender
            } else {
                const {default: {render: prodRender}} = await import('./dist/server/entry-server.js')
                render = prodRender
            }

            const {html: appHtml, initData, seoData = {}} = await render(url)

            const html = template
                .replace(`<!--ssr-init-data-->`, initData)
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-seo-data-->`, seoData)

            res.status(200).set({'Content-Type': 'text/html'}).end(html)
        } catch (e) {
            // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
            // 你的实际源码中。
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

}

createServer()
