import dayjs from 'dayjs'
import taxonomyRoutes from '@/data/taxonomyRoutes.json'

const categoryRoutes = taxonomyRoutes.categories as Record<string, string>
const tagRoutes = taxonomyRoutes.tags as Record<string, string>

export function createArticleLink(title: string) {
  return `/article/${title}`
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
