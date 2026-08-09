import dayjs from 'dayjs'
import taxonomyRoutes from '@/data/taxonomyRoutes.json'
import translations from '@/data/translations.json'
import type { IArticle, TTranslationGroup } from '@/typings'

const categoryRoutes = taxonomyRoutes.categories as Record<string, string>
const tagRoutes = taxonomyRoutes.tags as Record<string, string>
const translationMap = translations as Record<string, TTranslationGroup>

// 中英文共用 /article/ 命名空间，中文取 title、英文取 slug，route 由 metadata 脚本统一生成
export function createArticleLink(article: Pick<IArticle, 'title' | 'route'>) {
  return `/${article.route ?? `article/${article.title}`}`
}

/** 取当前路径对应的另一语言版本，无译文时返回 undefined */
export function resolveTranslationLink(currentPath: string, lang: string) {
  const key = decodeURIComponent(currentPath).replace(/\.html$/, '').replace(/\/$/, '')
  const group = translationMap[key]
  if (!group) return undefined
  return lang === 'en-US' ? group['zh-CN'] : group['en-US']
}

const SEPARATOR = '_'
export function createArchiveLink(list: string[]) {
  const key = list.join(SEPARATOR)
  const slug = categoryRoutes[key] ?? encodeURIComponent(key)
  return `/category/${slug}`
}
export function parseCategoryFomLink(val: string) {
  return val?.split(SEPARATOR) ?? []
}
export function createTagLink(tag: string) {
  const slug = tagRoutes[tag] ?? encodeURIComponent(tag)
  return `/tag/${slug}`
}
export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let called = false

  return () => {
    if (timeoutId) { clearTimeout(timeoutId) }

    if (!called) {
      fn()
      ;(called = true) && setTimeout(() => (called = false), delay)
    } else { timeoutId = setTimeout(fn, delay) }
  }
}

export function formatArticleDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
