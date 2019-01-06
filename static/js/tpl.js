let swig = require("swigjs")

// 前后端模板引擎共用一套自定义过滤器
let filters = require("../../app/lib/swig")

for(let key in filters){
    swig.setFilter(key, filters[key])
}

module.exports = swig
