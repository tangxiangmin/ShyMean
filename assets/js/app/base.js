/**
 * 公共方法
 */
require.config({
    baseUrl: '/assets/js/lib',
    path:{
        'jquery':'jquery'
    }
});

define(['jquery'],function () {
    var $ = require('jquery');

    // 使用rem进行布局
    var changeRem = function () {
        var newRem = function() {
            var html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    };
    // 选项卡
    var tab = function (sel) {
        return $(sel).each(function () {
            var _parent = $(this);
            _parent.find(".tab-item").on("click",function () {
                var num = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                _parent.find(".tab-sec").eq(num).addClass("active").siblings().removeClass("active");
            })
        });
    };

    return {
        changeRem: changeRem,
        tab: tab,
    }
});