// 遍历文章目录，解析标签、分类等属性，获取元数据
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

import { HexoPage2JSON } from './hexo2json.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const HEXO_POSTS_PATH = `/Users/tangxiangmin/github/blog-source/source/articles`
const HEXO_POSTS_EN_PATH = `/Users/tangxiangmin/github/blog-source/source/articles-en`

const ROOT = path.resolve(__dirname, '../views/article')
const ROOT_EN = path.resolve(__dirname, '../views/article-en')

// 中英文文章共用 /article/ 命名空间，语言靠 slug 区分，不靠路径层级
const ROUTE_PREFIX = 'article'

const SOURCES = [
  { lang: 'zh-CN', source: HEXO_POSTS_PATH, root: ROOT, dir: 'article' },
  { lang: 'en-US', source: HEXO_POSTS_EN_PATH, root: ROOT_EN, dir: 'article-en' },
]

function linkHexoPosts() {
  for (const { source, root } of SOURCES) {
    try {
      fs.unlinkSync(root)
    } catch (e) {
      //
    }
    if (!fs.existsSync(source)) {
      console.warn(`文章源目录不存在，跳过软链: ${source}`)
      continue
    }
    fs.symlinkSync(source, root)
  }
}

async function parseFile(filePath, { lang, root, dir }) {
  // 确保只读取文件，而不是目录
  // 读取文件内容
  const fileContent = await fs.readFile(filePath, 'utf8')
  const data = HexoPage2JSON(fileContent)
  data.content = '' // 不需要完整内容
  data.lang = lang
  data.fullPath = filePath.replace(`${root}/`, '')
  data.sourcePath = `${dir}/${data.fullPath}`
  return data
}

// 获取目标目录下的所有文件
async function getArticles(directory, context) {
  try {
    // 获取目录中的所有文件
    let articles = []
    const files = await fs.readdir(directory)
    for (const file of files) {
      if (file.startsWith('.')) {
        continue
      }

      const filePath = path.join(directory, file)
      const stat = await fs.stat(filePath)
      if (stat.isFile()) {
        try {
          const article = await parseFile(filePath, context)
          articles.push(article)

          // console.log(`${article.title} 解析完成`)
        } catch (e) {
          console.error(`${filePath} 解析失败`)
        }
      } else if (stat.isDirectory()) {
        articles = articles.concat(await getArticles(filePath, context))
      }
    }
    return articles
  } catch (err) {
    console.error('读取文件时发生错误:', err)
    return []
  }
}

async function getAllArticles() {
  let articles = []
  for (const context of SOURCES) {
    if (!fs.existsSync(context.root)) continue
    articles = articles.concat(await getArticles(context.root, context))
  }
  return articles
}

function isEnglish(article) {
  return article.lang === 'en-US'
}

// 中文取 title 作为路由段，英文取 slug，两者共用同一个命名空间
function resolveRouteSegment(article) {
  if (isEnglish(article)) {
    if (!article.slug) {
      throw new Error(`英文文章缺少 slug: ${article.sourcePath}`)
    }
    return article.slug
  }
  return article.title
}

function assignRoutes(articles) {
  const used = new Map()
  for (const article of articles) {
    const segment = resolveRouteSegment(article)
    const previous = used.get(segment)
    if (previous) {
      throw new Error(
        `路由冲突「${segment}」：${previous.sourcePath} 与 ${article.sourcePath}。`
        + '中英文共用 /article/ 命名空间，英文 slug 不能与任何中文标题或其他 slug 重复。',
      )
    }
    used.set(segment, article)
    article.route = `${ROUTE_PREFIX}/${segment}`
  }
}

function generateArchiveData(articles) {
  const categories = []
  const tags = {}
  function record(map, key) {
    if (!map[key]) {
      map[key] = 0
    }
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
    if (Array.isArray(article.tags)) {
      for (const tag of article.tags) {
        record(tags, tag)
      }
    }
  }
  return {
    categories,
    tags,
  }
}
function generateRewriteData(articles) {
  const map = {}
  for (const article of articles) {
    if (article.sourcePath) {
      map[article.sourcePath] = `${article.route}.md`
    }
  }
  return map
}

// 由英文文章单向声明的 translationOf 反向展开为双向映射。
// 键为站内绝对路径，中英文两侧都能直接命中，供 hreflang、语言切换、
// sitemap 准入和 Search Console 过滤共用。
function generateTranslationData(articles) {
  const byTranslationKey = new Map()
  for (const article of articles) {
    if (isEnglish(article)) continue
    const key = article.fullPath.replace(/\.md$/, '').split('/').pop()
    byTranslationKey.set(key, article)
  }

  const map = {}
  for (const article of articles) {
    if (!isEnglish(article)) continue
    if (!article.translationOf) {
      throw new Error(`英文文章缺少 translationOf: ${article.sourcePath}`)
    }
    const origin = byTranslationKey.get(article.translationOf)
    if (!origin) {
      throw new Error(
        `translationOf 无法解析到中文原文「${article.translationOf}」：${article.sourcePath}`,
      )
    }
    const group = {
      'zh-CN': `/${origin.route}`,
      'en-US': `/${article.route}`,
    }
    map[group['zh-CN']] = group
    map[group['en-US']] = group
  }
  return map
}

// Search Console 无法按路径前缀筛选英文页面，输出 slug 正则白名单供页面过滤使用
function generateSearchConsoleFilter(articles) {
  const slugs = articles.filter(isEnglish).map(article => article.slug).sort()
  if (!slugs.length) return ''
  return `/${ROUTE_PREFIX}/(${slugs.join('|')})`
}

function createSlug(value) {
  return value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

function createSlugMap(values) {
  const result = {}
  const used = new Set()

  for (const value of [...values].sort((a, b) => a.localeCompare(b, 'zh-CN'))) {
    const baseSlug = createSlug(value) || 'all'
    let slug = baseSlug
    let index = 2
    while (used.has(slug)) {
      slug = `${baseSlug}-${index}`
      index++
    }
    used.add(slug)
    result[value] = slug
  }

  return result
}

function generateTaxonomyRoutes(archives) {
  const categoryPaths = []

  function visitCategories(categories, parents = []) {
    for (const category of categories) {
      const path = [...parents, category.name]
      categoryPaths.push(path.join('_'))
      visitCategories(category.children, path)
    }
  }

  visitCategories(archives.categories)

  return {
    categories: createSlugMap(categoryPaths),
    tags: createSlugMap(Object.keys(archives.tags)),
  }
}

async function generateMetaData() {
  console.log('start parse articles and generate metadata')
  await linkHexoPosts()
  const articles = await getAllArticles()
  const data = articles.filter(article => !article.draft)
  // 译文与原文使用相同日期，列表中相邻展示；时间戳相同时中文原文排在前
  data.sort((a, b) => {
    const diff = +new Date(b.createdAt) - +new Date(a.createdAt)
    if (diff !== 0) return diff
    return Number(isEnglish(a)) - Number(isEnglish(b))
  })

  assignRoutes(data)

  fs.writeFileSync(path.resolve(__dirname, '../data/meta.json'), JSON.stringify(data, null, 4))

  // 分类树与标签路由只统计中文文章，避免英文文章改变现有计数并生成无页面的 taxonomy 路由
  const archives = generateArchiveData(data.filter(article => !isEnglish(article)))
  fs.writeFileSync(path.resolve(__dirname, '../data/archive.json'), JSON.stringify(archives, null, 4))

  const pathRewrites = generateRewriteData(data)
  fs.writeFileSync(path.resolve(__dirname, '../data/pathRewrites.json'), JSON.stringify(pathRewrites, null, 4))

  const translations = generateTranslationData(data)
  fs.writeFileSync(path.resolve(__dirname, '../data/translations.json'), JSON.stringify(translations, null, 4))

  fs.writeFileSync(path.resolve(__dirname, '../data/gsc-en-filter.txt'), generateSearchConsoleFilter(data))

  const srcExclude = articles
    .filter(article => article.draft)
    .map(article => article.sourcePath)
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
  fs.writeFileSync(path.resolve(__dirname, '../data/srcExclude.json'), JSON.stringify(srcExclude, null, 4))

  const taxonomyRoutes = generateTaxonomyRoutes(archives)
  fs.writeFileSync(path.resolve(__dirname, '../data/taxonomyRoutes.json'), JSON.stringify(taxonomyRoutes, null, 4))

  const enCount = data.filter(isEnglish).length
  console.log(`generate metadata success: ${data.length - enCount} zh-CN, ${enCount} en-US`)
}

generateMetaData()
