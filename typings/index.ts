export type THeadItem = [string, Record<string, string>, string?]

export type TArticleLanguage = 'zh-CN' | 'en-US'

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
  /** 页面语言，中文文章缺省为 zh-CN */
  lang: TArticleLanguage
  /** 最终路由，不含扩展名，如 article/xxx。由 metadata 脚本生成 */
  route: string
  /** 英文文章的稳定 URL 标识，只在英文文章中声明 */
  slug?: string
  /** 中文原文的源文件标识（不含分类路径与扩展名），只在英文文章中声明 */
  translationOf?: string
}

/** 单篇文章的语言版本映射，键为语言，值为站内绝对路径 */
export type TTranslationGroup = Partial<Record<TArticleLanguage, string>>

export interface ICategoryItem {
  name: string
  count: number
  children: ICategoryItem[]
}
