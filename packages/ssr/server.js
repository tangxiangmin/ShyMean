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
            // 1. 读取 index.html
            let template = fs.readFileSync(
                development ? path.resolve(__dirname, 'index.html') : path.resolve(__dirname, 'dist/client/index.html'),
                'utf-8'
            )

            // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
            //    同时也会从 Vite 插件应用 HTML 转换。
            //    例如：@vitejs/plugin-react 中的 global preambles
            if (development) {
                template = await vite.transformIndexHtml(url, template)
            }

            // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
            //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
            //    并提供类似 HMR 的根据情况随时失效。
            let render
            if (development) {
                const {render: devRender} = await vite.ssrLoadModule('/src/entry-server.tsx')
                render = devRender
            } else {
                const {default: {render: prodRender}} = await import('./dist/server/entry-server.js')
                render = prodRender
            }

            // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
            //    函数调用了适当的 SSR 框架 API。
            //    例如 ReactDOMServer.renderToString()
            const {html: appHtml, initData} = await render(url)


            // 5. 注入渲染后的应用程序 HTML 到模板中。
            const html = template.replace(`<!--ssr-init-data-->`, initData).replace(`<!--ssr-outlet-->`, appHtml).replaceAll('/dist/client/', '//cdn.shymean.com/')


            // 6. 返回渲染后的 HTML。
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
