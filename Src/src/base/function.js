
// 功能函数
// 命名空间为xm


/**
 *
 * @param UNIX时间戳
 */
let dateFormat = function (val) {
    let date = new Date(val*1000);

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = getTwo(month);

    let day = date.getDate();
    day = getTwo(day);

    function getTwo(n){
        n = '' + n;
        return  n[1]?n:'0'+n;
    }

    return year + '-' + month + '-' + day;
};

// 深复制，用于分页组件传递参数
let extend = function(target, options) {

    for (name in options) {
        copy = options[name];
        if (copy instanceof Array) {
            target[name] = extend([], copy);
        } else if (copy instanceof Object) {
            target[name] = extend({}, copy);
        } else {
            target[name] = options[name];
        }
    }

    return target;
}

// 防抖函数
let debounce = function (fn, delay) {
    let timer = null;
    return function () {
        let args = arguments;
        let self = this;
        clearTimeout(timer);
        setTimeout(function () {
            fn.call(self, args);
        },delay);
    }
};

module.exports =  {
    dateFormat,
    extend,
    debounce
};
