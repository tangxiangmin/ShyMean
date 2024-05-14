import markdownit from 'markdown-it'
import matter from 'gray-matter'

const md = markdownit()

// 获取摘要
function getAbstract(content) {
  const reMore = /<!--more-->/
  const res = reMore.exec(content)
  const index = (res && res.index) || 0

  return md.render(content.substring(0, index))
}

export function HexoPage2JSON(fileContent) {
  const { content, data } = matter(fileContent)

  return {
    ...data,
    title: data.title,
    createdAt: data.date,
    categories: data.categories,
    tags: data.tags,
    abstract: getAbstract(content).trim(),
    draft: data.draft,
    content: content.trim(),
  }
}
