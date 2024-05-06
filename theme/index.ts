import { App } from 'vue'
import '@/theme/global.scss'

import Comment from '@/theme/components/Comment.vue'
import LayoutArchive from '@/theme/layout/Archive.vue'
import LayoutTags from '@/theme/layout/Tags.vue'
import LayoutArticleFeed from '@/theme/layout/ArticleFeed.vue'
import LayoutArchiveSearch from '@/theme/layout/ArchiveSearch.vue'

export { default as Layout } from '@/theme/Layout.vue'

export function registerGlobalComponent(app: App) {
  app.component('user-comment', Comment)
  app.component('layout-archive', LayoutArchive)
  app.component('layout-tags', LayoutTags)
  app.component('layout-article-feed', LayoutArticleFeed)
  app.component('layout-archive-search', LayoutArchiveSearch)
}
