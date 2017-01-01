/**
 * 公共方法
 */

define(function () {
    // 使用rem进行布局
    var changeRem = function () {
        var newRem = function() {
            var html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    };

    return {
        changeRem: changeRem,
    }
});