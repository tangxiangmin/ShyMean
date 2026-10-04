import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, mkdir, writeFile } from 'node:fs/promises'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = 'https://www.shymean.com'

async function readData(name) {
  return JSON.parse(await readFile(path.join(projectRoot, 'data', name), 'utf8'))
}

function plainText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function link(label, route, description = '') {
  const title = plainText(label).replace(/[\\[\]]/g, '\\$&')
  const url = new URL(route, siteUrl).href.replace(/\(/g, '%28').replace(/\)/g, '%29')
  const note = plainText(description).slice(0, 180)
  return `- [${title}](${url})${note ? `: ${note}` : ''}`
}

function articleLink(article) {
  const description = article.head?.find(item => item?.[0] === 'meta' && item?.[1]?.name === 'description')?.[1]?.content
    || article.description
    || ''
  return link(article.title, `/${article.route}`, description)
}

export async function generateLlms() {
  const [articles, archive, taxonomy, translations] = await Promise.all([
    readData('meta.json'),
    readData('archive.json'),
    readData('taxonomyRoutes.json'),
    readData('translations.json'),
  ])
  const englishRoutes = new Set(Object.values(translations).map(group => group['en-US']).filter(Boolean))
  const published = articles.filter(article => !article.draft && article.route)
    .sort((a, b) => {
      const dateA = Date.parse(a.date || a.createdAt) || 0
      const dateB = Date.parse(b.date || b.createdAt) || 0
      return dateB - dateA
    })
  const chinese = published.filter(article => article.lang !== 'en-US').slice(0, 20)
  const english = published.filter(article => article.lang === 'en-US' && englishRoutes.has(`/${article.route}`)).slice(0, 10)
  const sections = [
    '# ShyMean',
    '',
    '> ShyMean 的个人技术博客，记录前端工程、源码分析、编程语言和软件开发实践。',
    '',
    '文章以中文为主，部分文章提供英文译文。内容包含技术实践、学习笔记与个人经验，阅读时请结合文章日期和所用软件版本。以下文章链接指向 HTML 正文页面。',
    '',
    '## 内容入口',
    '',
    link('文章归档', '/archive', '按时间浏览文章'),
    link('分类与标签', '/tags', '按主题查找文章'),
    link('站点地图', '/sitemap.xml', '完整页面索引'),
    link('RSS', '/feed.rss', '最新中文文章订阅'),
    '',
    '## 主要分类',
    '',
    ...archive.categories.filter(category => taxonomy.categories[category.name])
      .map(category => link(category.name, `/category/${taxonomy.categories[category.name]}`, `${category.count} 篇文章`)),
    '',
    '## 最新中文文章',
    '',
    ...chinese.map(articleLink),
  ]
  if (english.length) {
    sections.push('', '## Recent English Articles', '', ...english.map(articleLink))
  }
  sections.push('', '## Optional', '',
    link('关于作者', '/about'),
    link('项目', '/demo'),
    link('书籍与电影记录', '/book'),
    '')

  const outputDirectory = path.join(projectRoot, 'views', 'public')
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(path.join(outputDirectory, 'llms.txt'), sections.join('\n'), 'utf8')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateLlms()
}
