export interface IArticle {
  title: string
  content: string
  tags: string[]
  categories: string[]
  createdAt: string
  abstract: string
  updatedAt?: string
  fullPath?: string
  draft?: boolean
}

export interface ICategoryItem {
  name: string
  count: number
  children: ICategoryItem[]
}
