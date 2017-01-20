/**
 * Created by admin on 2017/1/12.
 */
define(function () {
    // rem布局
    !(function () {
        let newRem = function() {
            let html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();
});