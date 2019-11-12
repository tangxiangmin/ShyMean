// 返回完整的html模板，包括
// * 插入ssr渲染的html片段
// * 嵌入为客户端打包的相关文件，通过staticResource获取
import {staticResource} from "./build/render";

export default function getTemplate(html, initData, seoData): string {
    if (!seoData) {
        seoData = {
            title: '橙红年代',
            description: 'Author: shymean, Category: IT Blog, Name: 橙红年代, shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。',
            keywords: 'shymean,橙红年代,前端开发,个人博客,HTML,CSS,JavaScript,React,Vue,NodeJS',
        }
    }
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
    <link rel="stylesheet" href="//at.alicdn.com/t/font_213036_i5ygl1uyx3q.css">
    <link rel="stylesheet" href="${staticResource.css}">
    <script type="systemjs-packagemap">
        {
          "packages": {
            "av": "//cdn1.lncld.net/static/js/3.0.4/av-min.js",
            "Valine": "//unpkg.com/valine/dist/Valine.min.js",
            "L2Dwidget": "//cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js"
          }
        }
    </script>
    <script src="//cdn.bootcss.com/systemjs/2.1.1/system.js"></script>
</head>
<body>
    <div id="root">${html}</div>
    <script>
        window.INIT_DATA = ${JSON.stringify(initData)}
        var scripts =  document.getElementsByTagName('script')
        var cur = scripts[scripts.length - 1]
        cur.parentNode.removeChild(cur)
    </script>
    <script src="${staticResource.js}"></script>
</body>
</html>`
}
