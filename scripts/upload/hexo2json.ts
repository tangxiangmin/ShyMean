/**
 * Created by admin on 2017/7/23.
 * 将hexo博客的markdown文档解析成JSON，方便存储到SQL中
 */

// TODO 使用pyhanlp实现文件关键字及摘要提示 https://github.com/hankcs/pyhanlp
// function hanlp() {
//     let shell = require('shelljs')
//     let {code, stderr, stdout} = shell.exec(`python summary.py '''${data.content}'''`)
//     if (code === 0) {
//         console.log(stdout)
//     } else {
//         console.log(stderr)
//     }
// }

function exec(str: string, re: RegExp) {
    let res = re.exec(str);
    return res && res[1] || '';
}

// 获取摘要
function getAbstract(content: string) {
    let reMore = /<!--more-->/,
        res = reMore.exec(content),
        index = res && res.index || 0;

    return content.substr(0, index);
}

// 获取标签
function getTags(content: string) {
    let reTags = /tags:\s*-\s*([^]*?)(?=categories)/;
    let tags = exec(content, reTags).replace(/[\t\n\r]/g, '');

    return tags.split("-").map(item => {
        return item.trim();
    });
}

// 获取分类
function getCategories(content: string) {
    let reCategory = /categories:\s*-\s*([^]*?)[\r\n]/;
    let categories = exec(content, reCategory).replace(/[\t\n\r]/g, '');
    return categories.split("-").map(item => {
        return item.trim();
    });
}

// 获取日期
function getDate(content: string) {
    let reDate = /date:\s*([^]*?)[\r\n]/;
    let date = exec(content, reDate);
    return date
}

// 获取标题
function getTitle(content: string) {
    let reTitle = /title:\s*([^]*?)[\r\n]/;

    return exec(content, reTitle);
}

export default class Hexo2JSON {
    raw: string // 原始文本数据
    json: Object // 解析后的json数据

    constructor(raw: string) {
        this.raw = raw;
    }

    parse() {
        let data = this.raw;

        let re = /---([^]*?)---([^]*)/;
        // 拆分头部信息和主要内容
        let head = re.exec(data)[1];
        let content = re.exec(data)[2];

        this.json = {
            title: getTitle(head),
            created_at: getDate(head),
            categories: getCategories(head),
            tags: getTags(head),
            abstract: getAbstract(content).trim(),
            content: content.trim()
        };
        return this.json
    }
}
