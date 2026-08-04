import path from 'node:path'
import fs from 'fs-extra'
import type { SiteConfig } from 'vitepress'
import type { IArticle } from '../typings'

const SITE_URL = 'https://www.shymean.com'
const FEED_TITLE = 'ShyMean'
const FEED_DESCRIPTION = 'ShyMean 的个人技术博客，记录前端工程、源码分析、编程语言和软件开发实践。'

function escapeXml(content = ''): string {
  return String(content)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
}

function toCdata(content = ''): string {
  return `<![CDATA[${String(content).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`
}

function resolveDescription(article: IArticle): string {
  const headDescription = article.head
    ?.find(item => item?.[0] === 'meta' && item?.[1]?.name === 'description')
    ?.[1]?.content
  return headDescription || article.description || article.abstract || ''
}

export async function generateRSS(siteConfig: SiteConfig): Promise<void> {
  const articles = await fs.readJSON(path.resolve(siteConfig.root, 'data/meta.json')) as IArticle[]
  const items = articles.map((article) => {
    const url = new URL(`/article/${encodeURIComponent(article.title)}`, SITE_URL).href
    const publishDate = new Date(article.date || article.createdAt).toUTCString()
    return `    <item>
      <title>${toCdata(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${publishDate}</pubDate>
      <description>${toCdata(resolveDescription(article))}</description>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.rss" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  await fs.writeFile(path.resolve(siteConfig.outDir, 'feed.rss'), rss)
}
