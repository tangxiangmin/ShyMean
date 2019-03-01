let $ = require("jquery")
let Router = require("./router")
let Transition = require("./transition")

let comment = require('./comment')

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
    init() {
        this.setRouter()

        this.responsiveNav()
        this.backTop()
        this.toggleAside()

        this.catalogue();

        comment.init()

    },

    responsiveNav() {
        let $header = $(".page_hd");

        let $btn = $header.find(".btn-list"),
            $nav = $header.find(".nav-responsive");
        $btn.on("click", function () {
            $nav.toggleClass("active");
        })
    },

    toggleAside() {
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

    backTop() {
        let $btn = $(".btn-top");

        $(document).on("scroll", util.debounce(function () {
            $(this).scrollTop() > 200 ?
                $btn.addClass("active") :
                $btn.removeClass("active");

        }, 50));

        $btn.on("click", function () {
            $("html, body").animate({
                scrollTop: 0,
            }, self.speed)
        })
    },

    catalogue() {

        let $title = $(".article_ct h2"),
            $catalogueItem = $(".catalogue_item.lv1");

        // 找到当前视窗内的内容
        function setCurrentCatalogue() {
            if (!isArticlePage()) {
                return;
            }

            let i,
                len = $title.length;

            for (i = 0; i < len; ++i) {
                let rectObject = $title[i].getBoundingClientRect();
                if (rectObject.top > 0) {
                    break;
                }
            }

            i--;
            if (i >= len) {
                i = len - 1;
            } else if (i < 0) {
                i = 0;
            }

            $catalogueItem.removeClass("on").eq(i).addClass("on");
        }

        // todo 从Router暴露接口
        function isArticlePage() {
            let href = location.href;
            return /article\/.*?/.test(href);
        }

        // 初始化
        setCurrentCatalogue();

        let listen = util.debounce(function () {
            setCurrentCatalogue();
        }, 50);

        $(document).on("scroll", listen);
    },
    setRouter() {
        let $main = $("#page_wrap")

        let tpls = {
            '/': '/view/index.swig',
            '/\\d+': '/view/index.swig',
            '/article/.*?': {
                path: '/view/article.swig',
                success() {
                    console.log('article 加载成功')
                    comment.init()
                }
            },
            '/archive': '/view/archive.swig',
            '/archive/.*?': '/view/archive.swig',
            '/tags': '/view/tags.swig',
            '/book': '/view/book.swig',

            '/friend': '/view/friend.swig',
            '/about': '/view/about.swig',
            '/version': '/view/version.swig',
            '/demo': '/view/demo.swig',
            '/message': {
                path: '/view/message.swig',
                success(){
                    comment.init()
                }
            },
        }

        let router = new Router(tpls, $main, Transition.Loading)

        router.run();

        router.listen((item) => {
            this.catalogue();
        })

        this.router = router;
    }
}


module.exports = app
