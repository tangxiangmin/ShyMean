// 返回完整的html模板，包括
// * 插入ssr渲染的html片段
// * 嵌入为客户端打包的相关文件，通过staticResource获取
import {staticResource} from "./build/render";

export default function getTemplate(html, initData, seoData): string {
    if (!seoData) {
        seoData = {
            title: 'shymean',
            description: 'Author: shymean, Category: IT Blog, Name: shymean, shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。',
            keywords: 'shymean,shymean,前端开发,个人博客,HTML,CSS,JavaScript,React,Vue,NodeJS',
        }
    }
    let links =  staticResource.css.map(href=>{
        return `<link rel="stylesheet" href="${href}">`
    }).join('')
    let scripts = staticResource.js.map(src=>{
        return `<script src="${src}"></script>`
    }).join('')
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="all">
    <meta name="googlebot" content="all">
    <meta name="baiduspider" content="all">
    <meta name="renderer" content="webkit">
    <title>${seoData.title}</title>
    <meta name="keywords" content="${seoData.keywords}">
    <meta name="description" content="${seoData.description}">
    <link rel="shortcut icon" href="/favicon.ico">
<!--    <link rel="stylesheet" href="//at.alicdn.com/t/font_213036_i5ygl1uyx3q.css">-->
    ${links}
</head>
<body>
    <div id="root">${html}</div>
    <script>
        window.INIT_DATA = ${JSON.stringify(initData)}
        var scripts =  document.getElementsByTagName('script')
        var cur = scripts[scripts.length - 1]
        cur.parentNode.removeChild(cur)
    </script>
    ${scripts}
</body>
</html>`
}
