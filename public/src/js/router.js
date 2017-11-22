
let swig = require("./tpl")
let $ = require("jquery")

class Router {
    constructor(tpls, el){
        this.tpls = tpls

        this.cache = {}

        this.$main = el
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

        $main.removeClass("fadeOutRight")
            .addClass("fadeInLeft")
            .one('animationend', function(){
                $(this).removeClass("fadeInLeft")
            })

        $main.html(htm)
    }

    loadPage(href) {
        let $main = this.$main,
            cache = this.cache

        $main.addClass("fadeOutRight")

        this.replaceUrl(href)

        let handler = [
            $.get(`${href}`)
        ];

        if (!cache[href]){
            // todo 决定只缓存模板还是缓存整个数据填充后的Html
            let tpl = this.getTpl(href)
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
    }

    run(){
        let self = this

        $(document).on("click", "a", function () {

            let href = $(this).attr("href")
            self.loadPage(href)
            return false;
        })

        window.onpopstate = function (e) {
            let href = e.state.url
            self.loadPage(href)
        }
    }
}

module.exports = Router;