import path from 'node:path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
// dayjs v1插件的esm模块有问题，需要手动带后缀
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

const HEXO_POSTS_PATH = `/Users/tangxiangmin/github/blog-source/source/articles`

dayjs.extend(utc)
dayjs.extend(timezone)

function formatBeijingDate(utcTime) {
  if (!utcTime) return undefined

  const dayjsObj = dayjs.utc(utcTime) // 将输入转为utc时间
  const beijingTime = dayjsObj.tz('Asia/Shanghai') // 将utc时间转为北京时区时间

  return beijingTime.format()
}

async function updateFileMeta(filePath, parent) {
  const fileContent = await fs.readFile(filePath, 'utf8')
  const { content, data, draft } = matter(fileContent)
  if (draft) return
  const file = matter.stringify(content, {
    ...data,
    date: formatBeijingDate(data.date),
    categories: parent,
  })
  await fs.writeFile(filePath, file)
}

// 获取目标目录下的所有文件
async function getArticles(directory, parent = []) {
  try {
    // 获取目录中的所有文件
    let articles = []
    const files = await fs.readdir(directory)
    for (const file of files) {
      if (file.startsWith('.')) continue

      const filePath = path.join(directory, file)
      const stat = await fs.stat(filePath)
      if (stat.isFile()) {
        try {
          await updateFileMeta(filePath, parent)
          // console.log(`${article.title} 解析完成`)
        } catch (e) {
          console.error(`${filePath} 解析失败`, e)
        }
      } else if (stat.isDirectory()) {
        articles = articles.concat(await getArticles(filePath, [...parent, file]))
      }
    }
    return articles
  } catch (err) {
    console.error('读取文件时发生错误:', err)
    return []
  }
}

export async function run() {
  await getArticles(HEXO_POSTS_PATH)
}

run()
