import { readdir, readFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import type { SiteConfig } from 'vitepress'

export async function prunePageModules(config: SiteConfig) {
  if (config.site.router.prefetchLinks !== false) {
    throw new Error('裁剪完整页面模块前必须关闭 router.prefetchLinks。')
  }

  async function listFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true })
    const nested = await Promise.all(entries.map(entry => {
      const file = path.join(directory, entry.name)
      return entry.isDirectory() ? listFiles(file) : [file]
    }))
    return nested.flat()
  }

  const files = await listFiles(config.outDir)
  const names = new Set(files)
  const candidates = files.filter(file => /\.md\.[\w-]+\.js$/.test(file))
  if (!candidates.length) throw new Error('未找到完整页面模块，请复核当前 VitePress 的构建命名。')
  for (const file of candidates) {
    if (!names.has(file.replace(/\.js$/, '.lean.js'))) {
      throw new Error(`缺少激活页面所需的 lean 模块：${file}`)
    }
  }

  const removedNames = new Set(candidates.map(file => path.basename(file)))
  const removedFiles = new Set(candidates)
  for (const file of files) {
    if (removedFiles.has(file) || !/\.(?:js|html)$/.test(file)) continue
    const source = await readFile(file, 'utf8')
    const references = source.matchAll(/["'`]([^"'`<>\s]+\.js(?:[?#][^"'`<>\s]*)?)["'`]/g)
    for (const [, reference] of references) {
      const fileName = path.basename(decodeURI(reference.split(/[?#]/)[0]))
      if (removedNames.has(fileName)) {
        throw new Error(`保留产物仍引用完整页面模块：${file} → ${reference}`)
      }
    }
  }

  let bytes = 0
  for (const file of candidates) {
    bytes += (await readFile(file)).byteLength
    await unlink(file)
  }
  console.log(`Removed ${candidates.length} full page modules (${(bytes / 1e6).toFixed(2)} MB); retained lean modules.`)
}
