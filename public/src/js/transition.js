/**
 * 页面切换的过渡动画
 * 每个动画对象需实现in 和 out 两个方法
 */


let $ = require("jquery")

let transition = {
    Horizontal: {
        in($page){
            $page.removeClass("fadeOutRight")
                .addClass("fadeInLeft")
                .one('animationend', function(){
                    $(this).removeClass("fadeInLeft")
                })
        },
        out($page){
            $page.addClass("fadeOutRight")
        }
    },

    Loading: {

        in($page){
            let $load = $(".page_loading");
            $load.hide();
            $page.removeClass("fadeOut")
                .addClass("fadeIn")
                .one('animationend', function(){
                    $(this).removeClass("fadeIn")
                })

        },
        out($page){
            let $load = $(".page_loading");
            $load.show();

            $page.addClass("fadeOut")
        }
    }

}

module.exports = transition;