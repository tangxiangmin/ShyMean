import type { PageData } from 'vitepress'
import type { IArticle, TArticleLanguage, THeadItem, TTranslationGroup } from '../typings'

const SITE_URL = 'https://www.shymean.com'
const SITE_NAME = 'ShyMean'
const SITE_DESCRIPTION = 'ShyMean 的个人技术博客，记录前端工程、源码分析、编程语言和软件开发实践。'
const SITE_DESCRIPTION_EN = 'Frontend engineering notes, source code analysis and debugging write-ups by ShyMean.'
const AUTHOR_NAME = 'ShyMean'

const OG_LOCALE: Record<TArticleLanguage, string> = {
  'zh-CN': 'zh_CN',
  'en-US': 'en_US',
}

const PAGE_METADATA: Record<string, [string, string]> = {
  'about.md': ['关于 ShyMean', 'ShyMean 的个人介绍、博客说明和联系方式。'],
  'archive.md': ['文章归档', '按发布时间浏览 ShyMean 技术博客的全部文章。'],
  'book.md': ['书架', 'ShyMean 的阅读记录和读书笔记。'],
  'demo.md': ['项目', 'ShyMean 的个人项目和技术实践。'],
  'friend.md': ['友情链接', 'ShyMean 技术博客的友情链接。'],
  'message.md': ['留言板', '在 ShyMean 技术博客留言和交流。'],
  'tags.md': ['分类与标签', '按技术分类和标签浏览 ShyMean 博客文章。'],
  'version.md': ['博客版本记录', 'ShyMean 博客从 0.1 到当前版本的技术演进记录。'],
}

function getHeadMeta(head: THeadItem[] | undefined, key: string): string | undefined {
  return head
    ?.find(item => item?.[0] === 'meta' && item?.[1]?.name === key)
    ?.[1]?.content
}

function stripHtml(content = ''): string {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z#0-9]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function limitDescription(content: string): string {
  if (content.length <= 160) return content
  return `${content.slice(0, 159).trimEnd()}…`
}

function resolveCanonicalPath(pageData: PageData, article?: IArticle): string {
  if (article) return `/${article.route}`
  if (pageData.relativePath === 'archive/search.md') return '/archive'

  const path = pageData.relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return path ? `/${path}` : '/'
}

function resolvePageMetadata(pageData: PageData, article?: IArticle): [string, string] {
  const params = pageData.params ?? {}

  if (pageData.relativePath === 'index.md') {
    return [SITE_NAME, SITE_DESCRIPTION]
  }
  if (pageData.relativePath.startsWith('page/')) {
    return [
      `博客文章 - 第 ${params.page} 页`,
      `浏览 ShyMean 技术博客第 ${params.page} 页的文章。`,
    ]
  }
  if (pageData.relativePath.startsWith('category/')) {
    return [
      `${params.label}相关文章`,
      `浏览 ShyMean 技术博客中与“${params.label}”分类相关的文章。`,
    ]
  }
  if (pageData.relativePath.startsWith('tag/')) {
    return [
      `${params.label}相关文章`,
      `浏览 ShyMean 技术博客中带有“${params.label}”标签的文章。`,
    ]
  }
  if (article) {
    const fallback = article.lang === 'en-US' ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION
    const description = article.description
      || getHeadMeta(article.head, 'description')
      || stripHtml(article.abstract)
      || fallback
    return [article.title, limitDescription(description)]
  }

  return PAGE_METADATA[pageData.relativePath]
    ?? [pageData.title || SITE_NAME, pageData.description || SITE_DESCRIPTION]
}

function toAbsoluteUrl(pathname: string): string {
  return new URL(encodeURI(pathname), SITE_URL).href
}

// head 项由 VitePress 的 renderAttrs 转义，但页面模板里的
// <meta name="description"> 是把 pageData.description 原样插值的（VitePress 会先用
// filterOutHeadDescription 丢弃 head 中的同名项），描述里的引号会截断该属性。
// 因此只转义写回 pageData 的那一份，head 项保持原文避免二次转义。
function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

// 中英文两侧的 hreflang 均由 translations.json 展开，不各自维护。
// 只有实际存在译文的文章才输出关联，英文文章删除后中文页的关联自动消失。
function createAlternateHeadItems(group: TTranslationGroup | undefined): THeadItem[] {
  if (!group?.['zh-CN'] || !group['en-US']) return []
  return [
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: toAbsoluteUrl(group['zh-CN']) }],
    ['link', { rel: 'alternate', hreflang: 'en', href: toAbsoluteUrl(group['en-US']) }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: toAbsoluteUrl(group['zh-CN']) }],
  ]
}

function resolveImage(article?: IArticle): string | undefined {
  const image = article?.cover
    || article?.abstract?.match(/<img[^>]+src="([^"]+)"/)?.[1]

  if (!image) return undefined

  try {
    return new URL(image, SITE_URL).href
  } catch {
    return undefined
  }
}

function createArticleStructuredData(
  article: IArticle,
  canonicalUrl: string,
  description: string,
  image?: string,
): Record<string, unknown> {
  const datePublished = article.date || article.createdAt
  const dateModified = article.updated || article.updatedAt || datePublished
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: article.lang,
    headline: article.title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  }

  if (image) data.image = image
  return data
}

function createPageStructuredData(pageData: PageData, canonicalUrl: string): Record<string, unknown> | undefined {
  if (pageData.relativePath === 'index.md') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: 'ShyMean 技术博客',
      url: canonicalUrl,
      description: SITE_DESCRIPTION,
      inLanguage: 'zh-CN',
    }
  }
  if (pageData.relativePath === 'about.md') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: canonicalUrl,
      mainEntity: {
        '@type': 'Person',
        name: AUTHOR_NAME,
        url: canonicalUrl,
      },
    }
  }
  return undefined
}

function isManagedHeadItem(item: THeadItem): boolean {
  if (!Array.isArray(item)) return false
  if (item[0] === 'link' && item[1]?.rel === 'canonical') return true
  if (item[0] === 'link' && item[1]?.rel === 'alternate' && item[1]?.hreflang) return true
  if (item[0] === 'script' && item[1]?.type === 'application/ld+json') return true
  if (item[0] !== 'meta') return false

  const name = item[1]?.name
  const property = item[1]?.property
  return name === 'description'
    || name === 'keywords'
    || name === 'robots'
    || name?.startsWith('twitter:')
    || property?.startsWith('og:')
    || property?.startsWith('article:')
}

export function applySEOToPageData(
  pageData: PageData,
  articles: readonly IArticle[],
  translations: Readonly<Record<string, TTranslationGroup>> = {},
): void {
  if (pageData.isNotFound) return

  // transformPageData 执行时 relativePath 已是 rewrite 后的稳定路径。
  // 按 route 匹配可同时支持英文 slug，并修复原来按 title 匹配在标题重名时错配的问题。
  const article = articles.find(item => item.route && `${item.route}.md` === pageData.relativePath)
  const [title, description] = resolvePageMetadata(pageData, article)
  const canonicalPath = resolveCanonicalPath(pageData, article)
  const canonicalUrl = toAbsoluteUrl(canonicalPath)
  const image = resolveImage(article)
  const isArticle = Boolean(article)
  const structuredData = article
    ? createArticleStructuredData(article, canonicalUrl, description, image)
    : createPageStructuredData(pageData, canonicalUrl)

  pageData.title = title
  pageData.description = escapeAttribute(description)
  pageData.frontmatter.head = ((pageData.frontmatter.head ?? []) as THeadItem[])
    .filter(item => !isManagedHeadItem(item))

  const lang: TArticleLanguage = article?.lang ?? 'zh-CN'
  const head = pageData.frontmatter.head as THeadItem[]
  head.push(
    ['meta', { name: 'description', content: description }],
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ...createAlternateHeadItems(translations[canonicalPath]),
    ['meta', { property: 'og:locale', content: OG_LOCALE[lang] }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    ['meta', { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
  )

  if (image) {
    head.push(
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:image', content: image }],
    )
  }
  if (article) {
    const datePublished = article.date || article.createdAt
    const dateModified = article.updated || article.updatedAt || datePublished
    head.push(
      ['meta', { property: 'article:published_time', content: datePublished }],
      ['meta', { property: 'article:modified_time', content: dateModified }],
    )
  }
  if (pageData.relativePath === 'archive/search.md') {
    head.push(['meta', { name: 'robots', content: 'noindex,follow' }])
  }
  if (structuredData) {
    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(structuredData),
    ])
  }
}
