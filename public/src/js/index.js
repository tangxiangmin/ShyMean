


let swig = require("swigjs")
let $ = require("jquery")

// 自定义过滤器
let filters = require("../../../lib/swig")

for(let key in filters){
    swig.setFilter(key, filters[key])
}

$(function(){
    let $main = $("#page_wrap")
    // 思路：拦截链接请求并通过前端引擎替换模板内容

    let cache = {}
    // 模板需要配置，而接口约定自动加前缀/api/

    let tpls = {
        '/': '/views/_page/index.swig',
        '/article/.*?': '/views/_page/article.swig',
        '/archive': '/views/_page/archive.swig',
        '/tags': '/views/_page/tags.swig',
        '/book': '/views/_page/book.swig',

        '/message': '/views/_page/message.swig',
        '/friend': '/views/_page/friend.swig',
        '/about': '/views/_page/about.swig',
    }

    function replaceUrl(url) {
        history.pushState({
            test: "hello test"
        }, null, url)
    }

    function getTpl(pageMap, href) {
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
    
    function render(htm) {
        $main.removeClass("fadeOutRight")
            .addClass("fadeInLeft")
            .one('animationend', function(){
                $(this).removeClass("fadeInLeft")
            })

        $main.html(htm)
    }

    $(window).on("popstate", function(e){
        // console.log(e.state)
        // todo 根据缓存回退加载数据
        render(cache[e.state]);
    })

    $(document).on("click", "a", function () {

        // todo 修改历史栈, history API
        // todo 高亮当前链接
        // todo 页面切换过渡动画及加载动画，使用animate.css和progress-bar
        // todo 关联页面、路由和模板，可以通过一个hash表实现
        // todo 缓存模板，不缓存数据
        // todo swig共用过滤器等配置，通过webpack打包，微调后端和浏览器端的依赖模块

        let href = $(this).attr("href")
        $main.addClass("fadeOutRight")

        replaceUrl(href)

        if (!cache[href]){
            let handler = [
                $.get(`${href}`)
            ];

            // todo 决定只缓存模板还是缓存整个数据填充后的Html
            let tpl = getTpl(tpls, href)
            handler.push($.get(tpl))

            Promise.all(handler).then(res=>{
                let data = res[0],
                    tpl = cache[href]

                let htm = swig.render(tpl, {locals: data})

                // 缓存模板
                cache[href] = htm;

                render(htm);

            })
        }else {
            render(cache[href]);
        }



        return false;


    })

})