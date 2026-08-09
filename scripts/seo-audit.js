import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const DIST = path.resolve(ROOT, '.vitepress/dist')
const SITE_URL = 'https://www.shymean.com'

function collectFiles(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.resolve(directory, entry.name)
    if (entry.isDirectory()) return collectFiles(filePath, extension)
    return filePath.endsWith(extension) ? [filePath] : []
  })
}

function resolveDistFile(url) {
  const pathname = decodeURIComponent(new URL(url).pathname).replace(/^\//, '')
  const candidates = [
    path.resolve(DIST, `${pathname}.html`),
    path.resolve(DIST, pathname, 'index.html'),
  ]
  return candidates.find(candidate => fs.existsSync(candidate))
}

function assert(condition, message, errors) {
  if (!condition) errors.push(message)
}

function toAbsoluteUrl(pathname) {
  return new URL(encodeURI(pathname), SITE_URL).href
}

// 中英文共用 /article/ 命名空间，语言只能按 meta.json 的 lang 字段分流，不能按产物路径分流
function buildLanguageIndex(articles) {
  const index = new Map()
  for (const article of articles) {
    index.set(`${article.route}.html`, article)
  }
  return index
}

function auditHtml(errors, languageIndex, translations) {
  const htmlFiles = collectFiles(DIST, '.html')
    .filter(filePath => !filePath.endsWith('/404.html'))

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8')
    const relativePath = path.relative(DIST, filePath)
    const article = languageIndex.get(relativePath)
    const lang = article?.lang ?? 'zh-CN'

    assert(html.includes(`<html lang="${lang}"`), `${relativePath}: lang 不是 ${lang}`, errors)
    assert(/<title>[^<]+<\/title>/.test(html), `${relativePath}: 缺少 title`, errors)
    assert(/<meta name="description" content="[^"]+">/.test(html), `${relativePath}: 缺少 description`, errors)
    assert(!html.includes('name="keywords"'), `${relativePath}: 仍包含 meta keywords`, errors)

    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1]
    assert(Boolean(canonical), `${relativePath}: 缺少 canonical`, errors)

    if (article) {
      assert(html.includes('"@type":"BlogPosting"'), `${relativePath}: 缺少 BlogPosting`, errors)
      assert(
        html.includes(`"inLanguage":"${lang}"`),
        `${relativePath}: BlogPosting.inLanguage 不是 ${lang}`,
        errors,
      )

      const expectedCanonical = toAbsoluteUrl(`/${article.route}`)
      assert(
        canonical === expectedCanonical,
        `${relativePath}: canonical 不是 self-canonical，期望 ${expectedCanonical}，实际 ${canonical}`,
        errors,
      )

      const expectedLocale = lang === 'en-US' ? 'en_US' : 'zh_CN'
      assert(
        html.includes(`property="og:locale" content="${expectedLocale}"`),
        `${relativePath}: og:locale 不是 ${expectedLocale}`,
        errors,
      )

      if (lang === 'en-US') {
        assert(
          /^[\w-]+$/.test(article.slug ?? ''),
          `${relativePath}: 英文 slug 不是纯 ASCII：${article.slug}`,
          errors,
        )
      }

      const group = translations[`/${article.route}`]
      if (group) {
        for (const [hreflang, target] of [['zh-CN', group['zh-CN']], ['en', group['en-US']]]) {
          const href = toAbsoluteUrl(target)
          assert(
            html.includes(`hreflang="${hreflang}" href="${href}"`),
            `${relativePath}: 缺少 hreflang="${hreflang}" -> ${href}`,
            errors,
          )
          assert(href.startsWith('https://'), `${relativePath}: hreflang 不是完整 HTTPS URL`, errors)
        }
        assert(
          html.includes(`hreflang="x-default" href="${toAbsoluteUrl(group['zh-CN'])}"`),
          `${relativePath}: 缺少 x-default 指向中文原文`,
          errors,
        )
      } else {
        assert(!html.includes('hreflang='), `${relativePath}: 无译文却输出了 hreflang`, errors)
      }
    }
  }
}

// 中英文共用同一命名空间，路由段必须全局唯一
function auditRouteUniqueness(errors, articles) {
  const used = new Map()
  for (const article of articles) {
    const previous = used.get(article.route)
    assert(
      !previous,
      `路由重复「${article.route}」：${previous?.sourcePath} 与 ${article.sourcePath}`,
      errors,
    )
    used.set(article.route, article)
  }
}

// 单向声明在构建期展开为双向映射，此处只校验展开结果是否成对
function auditTranslations(errors, articles, translations) {
  const routes = new Set(articles.map(article => `/${article.route}`))
  for (const [key, group] of Object.entries(translations)) {
    assert(Boolean(group['zh-CN'] && group['en-US']), `translations ${key}: 语言版本不成对`, errors)
    assert(routes.has(group['zh-CN']), `translations ${key}: 中文目标不存在 ${group['zh-CN']}`, errors)
    assert(routes.has(group['en-US']), `translations ${key}: 英文目标不存在 ${group['en-US']}`, errors)
  }
}

function auditSitemap(errors, articles, translations) {
  const sitemapPath = path.resolve(DIST, 'sitemap.xml')
  if (!fs.existsSync(sitemapPath)) return

  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const registered = new Set(
    Object.values(translations).map(group => group['en-US']).filter(Boolean),
  )

  for (const article of articles) {
    if (article.lang !== 'en-US') continue
    const url = toAbsoluteUrl(`/${article.route}`)
    if (registered.has(`/${article.route}`)) {
      assert(sitemap.includes(url), `sitemap 缺少已登记的英文 URL: ${url}`, errors)
    } else {
      assert(!sitemap.includes(url), `sitemap 包含未登记的英文 URL: ${url}`, errors)
    }
  }
}

function auditDrafts(errors) {
  const srcExclude = fs.readJSONSync(path.resolve(ROOT, 'data/srcExclude.json'))
  for (const sourcePath of srcExclude) {
    const outputPath = path.resolve(DIST, sourcePath.replace(/\.md$/, '.html'))
    assert(!fs.existsSync(outputPath), `${sourcePath}: 草稿仍被构建`, errors)
  }
}

function auditRSS(errors, articles) {
  const rssPath = path.resolve(DIST, 'feed.rss')
  assert(fs.existsSync(rssPath), '缺少 feed.rss', errors)
  if (!fs.existsSync(rssPath)) return

  const rss = fs.readFileSync(rssPath, 'utf8')
  const links = [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)]
    .map(match => match[1])
  const zhArticles = articles.filter(article => article.lang !== 'en-US')

  assert(
    links.length === zhArticles.length,
    `RSS 条目数 ${links.length} 与公开中文文章数 ${zhArticles.length} 不一致`,
    errors,
  )
  for (const link of links) {
    assert(Boolean(resolveDistFile(link)), `RSS 链接没有对应页面: ${link}`, errors)
  }

  const enRoutes = articles.filter(article => article.lang === 'en-US').map(article => article.route)
  for (const route of enRoutes) {
    assert(!rss.includes(toAbsoluteUrl(`/${route}`)), `中文 RSS 混入英文条目: ${route}`, errors)
  }
}

function main() {
  if (!fs.existsSync(DIST)) {
    throw new Error('缺少 .vitepress/dist，请先执行 pnpm build')
  }

  const articles = fs.readJSONSync(path.resolve(ROOT, 'data/meta.json'))
  const translations = fs.readJSONSync(path.resolve(ROOT, 'data/translations.json'))

  const errors = []
  assert(fs.existsSync(path.resolve(DIST, 'sitemap.xml')), '缺少 sitemap.xml', errors)
  auditRouteUniqueness(errors, articles)
  auditTranslations(errors, articles, translations)
  auditHtml(errors, buildLanguageIndex(articles), translations)
  auditSitemap(errors, articles, translations)
  auditDrafts(errors)
  auditRSS(errors, articles)

  if (errors.length) {
    console.error(`SEO 审计失败，共 ${errors.length} 项：`)
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }

  console.log('SEO 审计通过')
}

main()
