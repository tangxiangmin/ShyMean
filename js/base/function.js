
// 功能函数
// 命名空间为xm

define([], function () {


    /**
     *
     * @param UNIX时间戳
     */
    var dateFormat = function (val) {
        var date = new Date(val*1000);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = getTwo(month);

        var day = date.getDate();
        day = getTwo(day);

        function getTwo(n){
            n = '' + n;
            return  n[1]?n:'0'+n;
        }

        return year + '-' + month + '-' + day;
    };

    // 深复制，用于分页组件传递参数
    var extend = function(target, options) {

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


    return {
        dateFormat: dateFormat,
        extend: extend
    }
});