import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const DIST = path.resolve(ROOT, '.vitepress/dist')

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

function auditHtml(errors) {
  const htmlFiles = collectFiles(DIST, '.html')
    .filter(filePath => !filePath.endsWith('/404.html'))

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8')
    const relativePath = path.relative(DIST, filePath)
    assert(html.includes('<html lang="zh-CN"'), `${relativePath}: lang 不是 zh-CN`, errors)
    assert(/<title>[^<]+<\/title>/.test(html), `${relativePath}: 缺少 title`, errors)
    assert(/<meta name="description" content="[^"]+">/.test(html), `${relativePath}: 缺少 description`, errors)
    assert(/<link rel="canonical" href="https:\/\/www\.shymean\.com\/[^"]*">/.test(html), `${relativePath}: 缺少 canonical`, errors)
    assert(!html.includes('name="keywords"'), `${relativePath}: 仍包含 meta keywords`, errors)

    if (relativePath.startsWith('article/')) {
      assert(html.includes('"@type":"BlogPosting"'), `${relativePath}: 缺少 BlogPosting`, errors)
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

function auditRSS(errors) {
  const rssPath = path.resolve(DIST, 'feed.rss')
  assert(fs.existsSync(rssPath), '缺少 feed.rss', errors)
  if (!fs.existsSync(rssPath)) return

  const rss = fs.readFileSync(rssPath, 'utf8')
  const links = [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)]
    .map(match => match[1])
  const articles = fs.readJSONSync(path.resolve(ROOT, 'data/meta.json'))

  assert(links.length === articles.length, `RSS 条目数 ${links.length} 与公开文章数 ${articles.length} 不一致`, errors)
  for (const link of links) {
    assert(Boolean(resolveDistFile(link)), `RSS 链接没有对应页面: ${link}`, errors)
  }
}

function main() {
  if (!fs.existsSync(DIST)) {
    throw new Error('缺少 .vitepress/dist，请先执行 pnpm build')
  }

  const errors = []
  assert(fs.existsSync(path.resolve(DIST, 'sitemap.xml')), '缺少 sitemap.xml', errors)
  auditHtml(errors)
  auditDrafts(errors)
  auditRSS(errors)

  if (errors.length) {
    console.error(`SEO 审计失败，共 ${errors.length} 项：`)
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }

  console.log('SEO 审计通过')
}

main()
