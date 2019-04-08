/**
 * 2019/3/1 下午12:54
 * 初始化Valine评论系统 文档https://valine.js.org/configuration.html
 */

let System = require('SystemJS')

module.exports = {
    init() {
        Promise.all([
            System.import("av"),
            System.import("Valine"),
        ]).then(([av, Valine]) => {
            new Valine.default({
                el: '#vcomments',
                appId: 'J9BV8j1TlKO7MHkO6r1awhCA-gzGzoHsz',
                appKey: 'm06FfscybDkLncEygOdxU2gb',
                placeholder: '说点什么吧...',
                avatar: '',
                path: window.location.pathname
            })
        })

    }
}