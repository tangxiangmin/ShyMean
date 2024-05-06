import { IArticle } from '@/typings'
import fs from 'fs-extra'
import path from 'path'
// @ts-ignore
import { HexoPage2JSON } from './hexo2json.ts'
import matter from 'gray-matter'

const HEXO_POSTS_PATH = `/Users/tangxiangmin/github/blog-source/source/articles`

async function updateFileMeta(filePath: string, parent: string[]) {
  const fileContent = await fs.readFile(filePath, 'utf8')
  const data = HexoPage2JSON(fileContent)
  const file = matter.stringify(data.content, {
    title: data.title,
    tags: data.tags,
    categories: parent,
    date: data.createdAt,
    draft: data.draft,
  })
  await fs.writeFile(filePath, file)
}

// 获取目标目录下的所有文件
async function getArticles(directory: string, parent: string[] = []): Promise<IArticle[]> {
  try {
    // 获取目录中的所有文件
    let articles: IArticle[] = []
    const files = await fs.readdir(directory)
    for (const file of files) {
      if (file.startsWith('.')) {
        continue
      }
      const filePath = path.join(directory, file)
      const stat = await fs.stat(filePath)
      if (stat.isFile()) {
        try {
          await updateFileMeta(filePath, parent)
          // console.log(`${article.title} 解析完成`)
        } catch (e) {
          console.error(`${filePath} 解析失败`)
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
