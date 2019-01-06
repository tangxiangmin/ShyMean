

// 自定义过滤器
let filters = {
    // 标签云
    tagSize(num){
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

    joinKey(content, key, separator = ","){
        return content.map(item=>{
            return item[key]
        }).join(separator)
    },
    currentYear(year){
        return new Date().getFullYear()
    }
}



module.exports = filters
