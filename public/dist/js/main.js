/**
 * Created by admin on 2017/10/13.
 */

require.config({
    paths: {
        jquery: "//cdn.bootcss.com/jquery/3.2.1/jquery.min",
        hljs: "//cdn.bootcss.com/highlight.js/9.2.0/highlight.min",
        fancybox: "//cdn.bootcss.com/fancybox/3.1.25/jquery.fancybox.min"
    },
    shim: {
        fancybox: {
            deps: ['jquery']
        }
    }
});

define("util", function () {
    return {
        debounce: function (fn, delay) {
            var last;
            return function () {
                var ctx = this,
                    args = arguments;
                clearTimeout(last);

                last = setTimeout(function () {

                    fn.apply(ctx, args);

                }, delay)
            }

        }
    }
})

// 侧边栏
define("aside", ["jquery", "util"], function ($, util) {
    var Aside = {
        $switchBtn: $("#J_toggleSide"),
        init: function () {
            var $btn = this.$switchBtn,
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

        show: function () {

        },
        hide: function () {
        },
        backTop: {
            speed: 300,
            $btn: $(".btn-top"),
            $body: $(document.body),
            setVisible: function () {
                var $btn = this.$btn;

                $(document).scrollTop() > 200 ? $btn.addClass("active") : $btn.removeClass("active");
            },

            listen: function () {
                var $btn = this.$btn,
                    $body = this.$body;

                this.setVisible();
                var self = this;

                $(document).on("scroll", util.debounce(function () {
                    self.setVisible();
                }, 50));

                // todo debounce
                $btn.on("click", function () {
                    
                    $("html, body").animate({
                        scrollTop: 0,
                    }, self.speed )
                })
            }
        },
    };

    return Aside;
});
define("header", ["jquery"], function ($) {
    return {
        init: function () {
            this._initDOM();
            this.toggleNav();
        },
        _initDOM: function () {
            var $header = $(".page_hd");
            this.$btn = $header.find(".btn-list");
            this.$nav = $header.find(".nav-responsive");
        },
        toggleNav: function () {
            let $btn = this.$btn,
                $nav = this.$nav;
            $btn.on("click", function () {
                $nav.toggleClass("active");
            })
        }
    }
})

define("tab", ["jquery"], function ($) {
    $.fn.extend({
        tab: function () {
            return this.each(function () {
                var $this = $(this),
                    $navItem = $this.find(".tab_item");

                $navItem.on("click", function () {
                    var $this = $(this);
                    var target = $this.data("target");

                    // todo grace
                    $(target).addClass("active").siblings().removeClass("active");
                    $(this).addClass("active").siblings().removeClass("active");
                })
            })
        }
    })
});

require(["jquery", "fancybox", "aside", "tab", "header"], function () {
    var $ = require("jquery"),
        Aside = require("aside"),
        Header = require("header");

    var App = {
        init: function () {
            Aside.backTop.listen();
            Aside.init();
            Header.init();

            $(".tab").tab();

        }
    };

    App.init();


})




