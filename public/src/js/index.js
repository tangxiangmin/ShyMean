


let $ = require("jquery")

let Router = require("./router")
let Transition = require("./transition")

$(function(){
    let util = {
        debounce: function (fn, delay) {
            let last;
            return function () {
                let ctx = this,
                    args = arguments;
                clearTimeout(last);

                last = setTimeout(function () {

                    fn.apply(ctx, args);

                }, delay)
            }

        }
    }

    let app = {
        init(){
            this.setRouter()

            this.responsiveNav()
            this.backTop()
            this.toggleAside()
            this.tab()
        },

        responsiveNav(){
            let $header = $(".page_hd");

            let $btn = $header.find(".btn-list"),
                $nav = $header.find(".nav-responsive");
            $btn.on("click", function () {
                $nav.toggleClass("active");
            })
        },

        toggleAside(){
            let $btn = $("#J_toggleSide"),
                $aside = $(".page_sd"),
                $main = $("#blog");

            $btn.on("click", function () {
                $aside.toggleClass("active");
                $main.toggleClass("active");

                $btn.toggleClass("close");
            });

            $btn.on("mouseover", function () {
                $btn.addClass("hover");
            }).on("mouseout", function () {
                $btn.removeClass("hover");
            })
        },
        tab(){
            // todo rm
            $.fn.extend({
                tab:function () {
                    return this.each(function () {
                        let $this = $(this)

                        let $items = $this.find(".tab_item")

                        $items.on("click", function(){
                            let target = $(this).data("target")
                            $(this).addClass("active").siblings().removeClass("active");
                            $(target).addClass("active").siblings().removeClass("active");
                        })
                    })
                }
            })

            $(".tab").tab();
        },
        backTop(){
            let $btn = $(".btn-top");

            $(document).on("scroll", util.debounce(function () {
                $(this).scrollTop() > 200 ?
                    $btn.addClass("active") :
                    $btn.removeClass("active");

            }, 50));

            $btn.on("click", function () {

                $("html, body").animate({
                    scrollTop: 0,
                }, self.speed )
            })
        },
        setRouter(){
            let $main = $("#page_wrap")

            let tpls = {
                '/': '/views/_page/index.swig',
                '/\\d+': '/views/_page/index.swig',
                '/article/.*?': '/views/_page/article.swig',
                '/archive': '/views/_page/archive.swig',
                '/archive/.*?': '/views/_page/archive.swig',
                '/tags': '/views/_page/tags.swig',
                '/book': '/views/_page/book.swig',

                // '/message': '/views/_page/message.swig',
                '/friend': '/views/_page/friend.swig',
                '/about': '/views/_page/about.swig',
                '/version': '/views/_page/version.swig',
            }

            let router = new Router(tpls, $main, Transition.Loading)

            router.run();
        }
    }

    app.init();
})