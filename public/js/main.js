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

// 侧边栏
define("aside", ["jquery"], function(){
    var Aside = {
        $switchBtn: $("#J_toggleSide"),
        init: function () {
            var $btn = this.$switchBtn,
                $aside = $(".page_sd"),
                $main = $("#blog");

            $btn.on("click", function(){
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

        show: function(){

        },
        hide: function(){},
        backTop: {
            speed: 2000,
            $btn: $(".btn-top"),
            $body: $(document.body),
            setVisible: function(){
                var $btn = this.$btn;
                this.$body.scrollTop() > 200 ?  $btn.addClass("active") : $btn.removeClass("active");
            },

            listen: function(){
                var $btn = this.$btn,
                    $body = this.$body;

                this.setVisible();
                var self = this;

                $(document).on("scroll", function () {
                    self.setVisible();
                });

                // todo debounce
                $btn.on("click", function () {
                    $body.animate({
                        scrollTop: 0,
                        speed: this.speed
                    })
                }.bind(this))
            }
        },
    };

    return Aside;
});
define("tab", ["jquery"], function($){
    $.fn.extend({
        tab: function(){
            return this.each(function(){
                var $this = $(this),
                    $navItem = $this.find(".tab_item");

                $navItem.on("click", function(){
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

require(["jquery", "hljs", "fancybox", "aside", "tab"], function(){
    var $ = require("jquery"),
        hljs = require("hljs"),
        Aside = require("aside");

    var App = {
        init: function(){
            Aside.backTop.listen();
            Aside.init();
            hljs.initHighlightingOnLoad();

            $(".tab").tab();

        }
    };

    App.init();


})




