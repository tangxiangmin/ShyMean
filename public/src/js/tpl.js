let swig = require("swigjs")

// 自定义过滤器
let filters = require("../../../lib/swig")

for(let key in filters){
    swig.setFilter(key, filters[key])
}

module.exports = swig