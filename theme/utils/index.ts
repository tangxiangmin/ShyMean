import dayjs from 'dayjs'
import type { ICategoryItem } from '@/typings'

export function createArticleLink(title: string) {
  return `/article/${title}`
}

const SEPARATOR = '_'
export function createArchiveLink(list: string[]) {
  return `/archive/search?type=${list.join(SEPARATOR)}`
}
export function parseCategoryFomLink(val: string) {
  return val?.split(SEPARATOR) ?? []
}
export function createTagLink(tag: string) {
  return `/archive/search?tag=${tag}`
}
export function createCategoryLink(cate: ICategoryItem) {
  function dfs(cate: ICategoryItem): string[] {
    let arr = [cate.name]
    cate.children.map((child) => {
      arr = arr.concat(dfs(child))
    })
    return arr
  }
  const list = dfs(cate)
  return createArchiveLink(list)
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
