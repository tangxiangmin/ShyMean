// 自定义过滤器
export default {
    // 标签云
    tagSize(num: number) {
        let fontSize = ""

        if (num <= 2) {
            fontSize = "text-xs"
        } else if (num > 2 && num <= 5) {
            fontSize = "text-sm"
        } else if (num > 5 && num <= 8) {
            fontSize = "text-md"
        } else {
            fontSize = "text-lg"
        }
        return fontSize
    },

    joinKey(content: any[], key: string, separator = ",") {
        return content.map((item: string) => {
            // @ts-ignore
            return item[key]
        }).join(separator)
    },
    currentYear() {
        return new Date().getFullYear()
    }
}
