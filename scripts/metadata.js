// 遍历文章目录，解析标签、分类等属性，获取元数据
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

import { HexoPage2JSON } from './hexo2json.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const HEXO_POSTS_PATH = `/Users/tangxiangmin/github/blog-source/source/articles`
const ROOT = path.resolve(__dirname, '../views/article')

function linkHexoPosts() {
  try {
    fs.unlinkSync(ROOT)
  }
  catch (e) {
    //
  }
  fs.symlinkSync(HEXO_POSTS_PATH, ROOT)
}

async function parseFile(filePath) {
  // 确保只读取文件，而不是目录
  // 读取文件内容
  const fileContent = await fs.readFile(filePath, 'utf8')
  const data = HexoPage2JSON(fileContent)
  data.content = '' // 不需要完整内容
  data.fullPath = filePath.replace(`${ROOT}/`, '')
  return data
}

// 获取目标目录下的所有文件
async function getArticles(directory) {
  try {
    // 获取目录中的所有文件
    let articles = []
    const files = await fs.readdir(directory)
    for (const file of files) {
      if (file.startsWith('.'))
        continue

      const filePath = path.join(directory, file)
      const stat = await fs.stat(filePath)
      if (stat.isFile()) {
        try {
          const article = await parseFile(filePath)
          // 忽略标记为draft的文章
          if (!article.draft)
            articles.push(article)

          // console.log(`${article.title} 解析完成`)
        }
        catch (e) {
          console.error(`${filePath} 解析失败`)
        }
      }
      else if (stat.isDirectory()) {
        articles = articles.concat(await getArticles(filePath))
      }
    }
    return articles
  }
  catch (err) {
    console.error('读取文件时发生错误:', err)
    return []
  }
}

function generateArchiveData(articles) {
  const categories = []
  const tags = {}
  function record(map, key) {
    if (!map[key])
      map[key] = 0
    map[key]++
  }
  function recordCategories(article) {
    let parent = categories
    if (!Array.isArray(article.categories)) {
      console.log(`${article.title}没有分类`, article)
      return
    }
    for (const cate of article.categories) {
      let child = parent.find(row => row.name === cate)
      if (!child) {
        child = {
          name: cate,
          count: 0,
          children: [],
        }
        parent.push(child)
      }
      child.count++
      parent = child.children
    }
  }

  for (const article of articles) {
    recordCategories(article)
    for (const tag of article.tags)
      record(tags, tag)
  }
  return {
    categories,
    tags,
  }
}
function generateRewriteData(articles) {
  const map = {}
  for (const article of articles) {
    if (article.fullPath) {
      // TODO 这里使用配置项优化
      map[`article/${article.fullPath}`] = `article/${article.title}.md`
    }
  }
  return map
}

export async function generateMetaData() {
  await linkHexoPosts()
  const data = await getArticles(ROOT)
  data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  fs.writeFileSync(path.resolve(__dirname, '../data/meta.json'), JSON.stringify(data, null, 4))

  const archives = generateArchiveData(data)
  fs.writeFileSync(path.resolve(__dirname, '../data/archive.json'), JSON.stringify(archives, null, 4))

  const pathRewrites = generateRewriteData(data)
  fs.writeFileSync(path.resolve(__dirname, '../data/pathRewrites.json'), JSON.stringify(pathRewrites, null, 4))
}

generateMetaData()
