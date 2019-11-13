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

export function formatDate(date: string | Date) {
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    let y: string = date.getFullYear().toString()
    let m: string = (date.getMonth() + 1).toString()
    let d: string = date.getDate().toString()

    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}
