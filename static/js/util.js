/**
 * 2019/3/1 下午2:33
 */

function getParams(url, seperator) {
    let pattern = new RegExp('([\\w\\d\\_\\-]+)=([^\\s\\&' + (seperator || '') + ']+)', 'ig');
    let parames = {};
    url.replace(pattern, function (a, b, c) {
        parames[b] = c;
    });
    return parames;
}

let pageType = (() => {
    let ua = navigator.userAgent
    let pageType
    if (/Android|iPod|iPhone|Windows\s*Phone|Mobile|meizu|lephone|xiaomi|mui|coolpad|zte|huawei/i.test(ua)) {
        if (/\sQQ\/\d|QZone/i.test(ua)) {
            pageType = 'qq';
        } else if (/MicroMessenger/i.test(ua)) {
            let isMiniProgram = (() => {
                let data = getParams(window.location.href)
                return (data && data._wxjs == 1) || (window.__wxjs_environment === 'miniprogram')
            })()

            // 判断小程序环境
            if (isMiniProgram) {
                pageType = 'miniprogram';
            } else {
                pageType = 'wx';
            }
        } else if (/Weibo/i.test(ua)) {
            pageType = 'weibo';
        } else {
            pageType = 'm';
        }
    } else {
        pageType = 'pc';
    }
    return pageType
})();

module.exports = {
    debounce(fn, delay) {
        let last;
        return function () {
            let ctx = this,
                args = arguments;
            clearTimeout(last);

            last = setTimeout(function () {

                fn.apply(ctx, args);

            }, delay)
        }
    },
    getParams,
    pageType
}
