// 使用文档：https://www.shymean.com/article/在VitePress中实现内联Vue组件

import type { Encoding } from 'node:crypto'
import crypto from 'node:crypto'

import { sfcPlugin } from '@mdit-vue/plugin-sfc'
import MarkdownIt from 'markdown-it'

interface VirtualModule { virtualPath: string, componentName: string }

interface SFCBlockConfig {
  component: boolean
  lazy?: boolean
  name?: string
}

function getHash(content: string, type = 'md5', encoding = 'utf8') {
  return crypto.createHash(type).update(content, encoding as Encoding).digest('hex')
}

function createVirtualModulePath(id: string) {
  return `virtual:${id}.vue`
}

function injectImports(content: string, modules: VirtualModule[]) {
  const md = MarkdownIt({ html: true }).use(sfcPlugin, {})
  const env: any = {}
  md.render(content, env)

  const improts = modules.map(({ componentName, virtualPath }) => {
    return `import ${componentName} from '${virtualPath}'`
  }).join('\n')

  const re = /^<script.*?setup.*?>$/
  const setupScript = env.sfcBlocks.scripts.find(row => re.test(row.tagOpen))
  if (!setupScript) {
    // 原md文档不存在setup script
    content += `\n<script setup>\n${improts}\n</script>\n`
  }
  else {
    // 存在setup script
    content = content.replace(setupScript.content, () => {
      return [setupScript.tagOpen, improts, setupScript.contentStripped, setupScript.tagClose].join('\n')
    })
  }
  return content
}

export default function myPlugin() {
  const virtualSFCModuleMap = new Map()

  function replaceSourceCode(content: string, modules: VirtualModule[]) {
    for (const { virtualPath, componentName } of modules) {
      const code = virtualSFCModuleMap.get(virtualPath) ?? ''
      const ans = code ? `\n\`\`\`vue\n${code}\n\`\`\`\n` : ''

      // const regex = new RegExp(`\\[\\[\\[sourcecode ${componentName}\\]\\]\\]`, 'g');
      const regex = new RegExp(`>>> virtual:${componentName}\n`, 'g')
      content = content.replace(regex, ans)
    }

    return content
  }
  function parseFile(source: string) {
    const re = /```vue (.*)\n([\s\S]*?)```/gi
    const list: { virtualPath: string, componentName: string }[] = []

    let content = source.replace(re, (_, $1, $2) => {
      const id = getHash($2)
      let config: SFCBlockConfig = { component: true, lazy: false }
      try {
        config = JSON.parse($1)
        if (!config.component)
          return _
      }
      catch (e) {
        console.log('md-vue-sfc-plugin SFCBlockConfig parse error', e)
        return _
      }

      const virtualPath = createVirtualModulePath(id)
      virtualSFCModuleMap.set(virtualPath, $2)
      const componentName = config.name || `Comp${id}`
      list.push({
        virtualPath,
        componentName,
      })

      return config.lazy ? '' : `\n<${componentName} />\n`
    })
    content = replaceSourceCode(injectImports(content, list), list)
    return content
  }

  return {
    name: 'md-vue-sfc-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (virtualSFCModuleMap.has(id))
        return id
    },
    load(id) {
      if (virtualSFCModuleMap.has(id)) {
        return {
          code: virtualSFCModuleMap.get(id),
        }
      }
    },
    transform(source, id) {
      if (!/\.md$/.test(id))
        return

      return parseFile(source)
    },
  }
}
