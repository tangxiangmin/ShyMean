import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { MarkdownOptions, SiteConfig, UserConfig } from 'vitepress'
import type { Plugin, ViteDevServer } from 'vite'

type TCodeTransformer = NonNullable<MarkdownOptions['codeTransformers']>[number]

export function createCodeHighlightStyles() {
  const styles = new Map<string, string>()
  let base = '/'
  let isBuild = false
  let renderedCSS: string | undefined
  let devServer: ViteDevServer | undefined
  let updateQueued = false

  function getCSS() {
    return [...styles].sort(([a], [b]) => a.localeCompare(b))
      .map(([className, style]) => `.vp-code .${className}{${style}}`).join('\n')
  }

  function getFileName(css: string) {
    const hash = createHash('sha256').update(css).digest('hex').slice(0, 8)
    return `assets/code-highlight.${hash}.css`
  }

  function registerStyle(style: string) {
    const className = `h${createHash('sha256').update(style).digest('base64url').slice(0, 5)}`
    const existing = styles.get(className)
    if (existing !== undefined) {
      if (existing !== style) throw new Error('代码高亮样式类名冲突，需要增加哈希长度。')
      return className
    }
    styles.set(className, style)
    if (devServer && !updateQueued) {
      updateQueued = true
      queueMicrotask(() => {
        updateQueued = false
        const url = `${base}__code-highlight.css`
        devServer?.ws.send({
          type: 'update',
          updates: [{ type: 'css-update', path: url, acceptedPath: url, timestamp: Date.now() }],
        })
      })
    }
    return className
  }

  const transformer: TCodeTransformer = {
    name: 'blog:shared-code-highlight-styles',
    span(node) {
      const style = node.properties.style
      if (typeof style !== 'string' || !style.includes('--shiki-')) return
      this.addClassToHast(node, registerStyle(style))
      delete node.properties.style
    },
  }

  const plugin: Plugin = {
    name: 'blog:code-highlight-styles',
    configResolved(config) {
      base = config.base
      isBuild = config.command === 'build'
    },
    transformIndexHtml() {
      if (!isBuild) {
        return [{ tag: 'link', attrs: { rel: 'stylesheet', href: `${base}__code-highlight.css` }, injectTo: 'head' }]
      }
    },
    configureServer(server) {
      devServer = server
      server.httpServer?.once('close', () => { devServer = undefined })
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== `${base}__code-highlight.css` && url !== '/__code-highlight.css') return next()
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        res.end(getCSS())
      })
    },
  }

  const transformHead: NonNullable<UserConfig['transformHead']> = () => {
    const css = getCSS()
    if (isBuild) {
      if (renderedCSS !== undefined && renderedCSS !== css) {
        throw new Error('页面渲染期间新增了高亮样式，无法生成一致的公共样式表。')
      }
      renderedCSS = css
    }
    const href = `${base}${isBuild ? getFileName(css) : '__code-highlight.css'}`
    return [['link', { rel: 'stylesheet', href }]]
  }

  async function buildEnd(config: SiteConfig) {
    const css = getCSS()
    if (renderedCSS !== css) throw new Error('高亮样式收集结果与页面引用不一致。')
    const file = path.join(config.outDir, getFileName(css))
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, css)
  }

  return { transformer, plugin, transformHead, buildEnd }
}
