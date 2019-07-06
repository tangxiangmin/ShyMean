/**
 * 2019-06-29 17:11
 */
let fs = require('fs')

import IndexController from '../../server/controller/IndexController'
import Hexo2JSON from './hexo2json'

function formatParams(data: any) {
    let {tags, categories, content, title, abstract, created_at} = data
    // 将分类也统一处理为标签，使用type字段分离
    const TYPE_TAG = 1, TYPE_CATEGORY = 2;

    let totalTags = tags.map((item: any) => {
        return {
            name: item,
            type: TYPE_TAG
        }
    }).concat(categories.map((item: any) => {
        return {
            name: item,
            type: TYPE_CATEGORY
        }
    }));


    return {
        title,
        content,
        abstract,
        tags: totalTags,
        categories,
        created_at
    }
}

export async function upload(file: string) {
    if (!fs.existsSync(file)) {
        console.warn(`${file} 不存在`)
        return
    }

    try {
        let content = fs.readFileSync(file); // step1 读取markdown文件内容
        let parser = new Hexo2JSON(content); // step2 将 markdown 文件解析成json
        let data = parser.parse()
        let params = formatParams(data) // 格式化json，处理成接口需要的参数

        return await IndexController.addArticle(params) // 调用控制器接口，插入数据
    } catch (e) {
        console.log(e)
    }
}

// 批量上传
export async function batchUpload(dir: string) {
    this.files = fs.readdirSync(dir, 'utf-8');
    this.files.forEach((file: string) => {
        this.getInfo(file)
    });
}

