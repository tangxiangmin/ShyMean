export type THeadItem = [string, Record<string, string>, string?]

export interface IArticle {
  title: string
  content: string
  tags: string[]
  categories: string[]
  createdAt: string
  date?: string
  abstract: string
  description?: string
  cover?: string
  updated?: string
  updatedAt?: string
  fullPath?: string
  draft?: boolean
  ai?: boolean
  head?: THeadItem[]
}

export interface ICategoryItem {
  name: string
  count: number
  children: ICategoryItem[]
}
