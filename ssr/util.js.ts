export function debounce(fn: Function, delay: number) {
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

export function sleep(ms: number = 100) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
