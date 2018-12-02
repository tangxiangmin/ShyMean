let swig = require("./tpl")
let $ = require("jquery")


class Router {
    /**
     *
     * @param tpls 模板配置文件
     * @param el 页面容易元素
     * @param transition 页面过渡效果
     */
    constructor(tpls, el, transition) {
        this.tpls = tpls

        this.cache = {}

        this.$main = el

        this.transition = transition

        this.cbs = [];

        this.currentUrl = '';

        // todo 提供判断当前页面的接口
    }

    install(plugin) {
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

        if (!page) {
            for (let key in pageMap) {
                if (pageMap.hasOwnProperty(key)) {
                    let re = new RegExp(`^${key}$`)
                    if (re.test(href)) {

                        page = pageMap[key]
                        break
                    }
                }
            }
        }

        return page
    }

    setTitle(title) {
        $("title").text(title);
    }

    render(htm) {
        let $main = this.$main

        this.transition.in($main)

        $main.html(htm)
    }

    resetScrollTop() {
        if (document.compatMode === "BackCompat") {
            document.body.scrollTop = 0
        } else {
            document.documentElement.scrollTop = 0
        }
    }

    loadPage(href) {
        let tpl = this.getTpl(href)

        // 如果没有匹配路由，则按照普通链接跳转
        if (!tpl) {
            return true
        }
        if (this.currentUrl === href) {
            return false
        }

        this.currentUrl = href;

        let $main = this.$main,
            cache = this.cache

        this.transition.out($main)

        this.replaceUrl(href)

        let handler = [
            $.get(`${href}`)
        ];

        if (!cache[href]) {
            handler.push($.get(tpl).then(res => {
                cache[href] = res;
            }))
        }

        Promise.all(handler).then(res => {
            let data = res[0],
                tpl = cache[href]

            let htm = swig.render(tpl, {locals: data})

            // 缓存模板

            this.render(htm)
            this.resetScrollTop()
        })

        // 阻止默认跳转
        return false
    }

    run() {
        let self = this

        $(document).on("click", "a", function () {
            let href = $(this).attr("href")

            return self.change(href);
        })

        window.onpopstate = function (e) {
            let href = e.state.url

            self.change(href)
        }
    }

    change(href) {

        this.cbs.forEach(cb => {
            cb(this);
        });

        this.setTitle("橙红年代");
        return this.loadPage(href);
    }

    listen(fn) {
        if (typeof fn === 'function') {
            this.cbs.push(fn)
        }
    }

}

module.exports = Router;
