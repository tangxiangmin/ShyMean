/**
 * 2019/3/1 下午12:54
 * 初始化Valine评论系统 文档 https://valine.js.org/configuration.html
 */

function loadScript(src) {
    return new Promise(((resolve, reject) => {
        let script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve()
            remove()
        }
        script.onerror = () => {
            reject()
            remove()
        }
        document.body.appendChild(script)

        function remove() {
            script.parentNode.removeChild(script)
        }
    }))
}

function getReady() {
    let avUrl = `//cdn1.lncld.net/static/js/3.0.4/av-min.js`
    let valineUrl = `//unpkg.com/valine/dist/Valine.min.js`

    return Promise.all([
        loadScript(avUrl),
        loadScript(valineUrl),
    ]).then(res => {
        isLoading = false
    })
}

function start() {
    // @ts-ignore
    new Valine({
        el: '#vcomments',
        appId: 'J9BV8j1TlKO7MHkO6r1awhCA-gzGzoHsz',
        appKey: 'm06FfscybDkLncEygOdxU2gb',
        placeholder: '说点什么吧...',
        avatar: '',
        path: window.location.pathname
    })
}

let isLoading = false
let isReady = false
let timer
export default {
    init() {
        // 只在浏览器中加载
        if (typeof window === "undefined") {
            return
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (!isReady) {
                getReady().then(res => {
                    isReady = true
                    start()
                })
            } else {
                start()
            }
        })
    }
}
