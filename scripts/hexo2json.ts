import markdownit from 'markdown-it'
import matter from 'gray-matter'
import { IArticle } from '../typings'

const md = markdownit()

// 获取摘要
function getAbstract(content: string) {
  const reMore = /<!--more-->/,
    res = reMore.exec(content),
    index = (res && res.index) || 0

  return md.render(content.substring(0, index))
}

export function HexoPage2JSON(fileContent: string): IArticle {
  const { content, data } = matter(fileContent)

  return {
    title: data.title,
    createdAt: data.date,
    categories: data.categories,
    tags: data.tags,
    abstract: getAbstract(content).trim(),
    draft: data.draft,
    content: content.trim(),
  }
}
