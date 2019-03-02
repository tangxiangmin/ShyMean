/**
 * 2019/3/1 下午2:33
 */
let util = {
    debounce: function (fn, delay) {
        let last;
        return function () {
            let ctx = this,
                args = arguments;
            clearTimeout(last);

            last = setTimeout(function () {

                fn.apply(ctx, args);

            }, delay)
        }

    }
}

module.exports = util
