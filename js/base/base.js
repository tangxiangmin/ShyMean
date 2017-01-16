/**
 * Created by admin on 2017/1/12.
 */
define(function () {
    !(function () {
        var newRem = function() {
            var html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();

});