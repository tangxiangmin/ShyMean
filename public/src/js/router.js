
let swig = require("./tpl")
let $ = require("jquery")


class Router {
    /**
     *
     * @param tpls 模板配置文件
     * @param el 页面容易元素
     * @param transition 页面过渡效果
     */
    constructor(tpls, el, transition){
        this.tpls = tpls

        this.cache = {}

        this.$main = el

        this.transition = transition
    }

    install(plugin){
        // todo 路由插件
    }


    replaceUrl(url) {
        history.pushState({
            url: url
        }, null, url)
    }

    getTpl(href) {
        let pageMap = this.tpls
        let page = pageMap[href]

        if (!page){
            for (let key in pageMap){
                if (pageMap.hasOwnProperty(key)){
                    let re = new RegExp(`^${key}$`)
                    if (re.test(href)){
                        page = pageMap[key]
                        break
                    }
                }
            }
        }

        return page
    }

    render(htm) {
        let $main = this.$main

        this.transition.in($main)

        $main.html(htm)
    }

    loadPage(href) {
        let tpl = this.getTpl(href)

        // 如果没有匹配路由，则按照普通链接跳转
        if (!tpl){
            return true
        }

        let $main = this.$main,
            cache = this.cache

        this.transition.out($main)

        this.replaceUrl(href)

        let handler = [
            $.get(`${href}`)
        ];

        if (!cache[href]){
            // todo 决定只缓存模板还是缓存整个数据填充后的Html
            handler.push($.get(tpl).then(res=>{
                cache[href] = res;
            }))

        }

        Promise.all(handler).then(res=>{
            let data = res[0],
                tpl = cache[href]

            let htm = swig.render(tpl, {locals: data})

            // 缓存模板

            this.render(htm)
        })

        // 阻止默认跳转
        return false
    }

    run(){
        let self = this

        $(document).on("click", "a", function () {

            let href = $(this).attr("href")
            return self.loadPage(href)
        })

        window.onpopstate = function (e) {
            let href = e.state.url
            self.loadPage(href)
        }
    }
}

module.exports = Router;