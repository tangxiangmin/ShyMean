/**
 * 2018/11/20 下午9:35
 */

require('./scss/blog.scss')

let System = require('SystemJS')

Promise.all([
    System.import("jquery"),
    System.import("swig"),
]).then(([$, swig]) => {
    let app = require('./js/index')
    app.init();
})

