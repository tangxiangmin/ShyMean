/**
 * 2019-07-06 23:23
 * 将本地markdown文档解析成json并保存到mysql
 */

import {upload} from "./upload/index";

function init() {
    // todo 优化参数获取形式
    let args = process.argv.splice(2);

    // 拼接需要上传的文件
    const file = args[0]
    if (!file) {
        console.log('请传入需要上传的文件名')
        return
    }
    const defaultPath = `/Users/Txm/Desktop/github/blog-source/source/_posts/`
    const fileName = `${defaultPath}${file}`

    upload(fileName).then((articleId: number) => {
        console.log(`${fileName} 上传成功，文章id：${articleId}`)
    })

}

init()
