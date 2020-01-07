/**
 * 2019-07-06 23:23
 * 将本地markdown文档解析成json并保存到mysql
 */

import * as fs from 'fs'
import {upload} from "./upload/index";
import logger from "../server/util/logger";

const inquirer = require('inquirer')

// 原hexo项目的_posts目录
const defaultRoot: string = `/Users/bcz/github/blog-source/source/_posts/`

init()

async function init() {
    let args = process.argv.splice(2);
    const file = args[0]

    if (!file) {
        const key = 'uploadDir'
        let answers = await inquirer.prompt([{
            type: 'confirm',
            name: key,
            message: `未指定file参数，是否上传${defaultRoot}目录下所有文件？`,
            default: true
        }])

        if (answers[key]) {
            uploadDir()
        }
    } else {
        const fileName = `${defaultRoot}${file}`
        uploadFile(fileName)
    }
}

// 上传单个文件
async function uploadFile(fileName: string) {
    if (!fileName) {
        console.log('请传入需要上传的文件名')
        return
    }

    let articleId = await upload(fileName)
    if (articleId) {
        console.log(`${fileName} 上传成功，文章id：${articleId}`)
        return articleId
    } else {
        console.log(`${fileName} 上传失败`)
    }
}

// 上传整个文件夹的数据
async function uploadDir(root: string = defaultRoot) {
    console.log(`开始上传${root}目录下所有文件`)
    let files = fs.readdirSync(root);

    let success = []
    let start = Date.now()
    let end
    for (let file of files) {
        if (/\.md/.test(file) === false) {
            continue
        }
        try {
            // 上传文件
            let fileName: string = root + file

            const articleId = await uploadFile(fileName)
            // 记录
            end = Date.now()
            success.push({
                file,
                id: articleId,
                time: end - start
            })
            start = end
        } catch (e) {
            logger.error(`file${file}上传失败：`, e)
        }
    }

    logger.info(`文件上传成功，总计${success.length}条，`, JSON.stringify(success))
    console.log("全部文件上传完毕")
    process.exit();
}

