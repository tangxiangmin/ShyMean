

let marked = require("./marked")

// 自定义过滤器
let filters = {
    // 标签云
    tagSize(num, idx){
        let fontSize = ""

        if (num <= 2) {
            fontSize =  "text-xs"
        } else if (num > 2 && num <= 5) {
            fontSize = "text-sm"
        } else if (num > 5 && num <= 8) {
            fontSize = "text-md"
        } else {
            fontSize = "text-lg"
        }
        return fontSize
    },

    // markdown
    marked(content){
        return marked(content)
    }
}



module.exports = filters