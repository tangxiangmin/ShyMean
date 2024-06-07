import type { App } from 'vue'
import type { Router } from 'vitepress'

import '@/theme/global.scss'

import Comment from '@/theme/components/Comment.vue'
import LayoutArchive from '@/theme/layout/Archive.vue'
import LayoutTags from '@/theme/layout/Tags.vue'
import LayoutArticleFeed from '@/theme/layout/ArticleFeed.vue'
import LayoutArchiveSearch from '@/theme/layout/ArchiveSearch.vue'
import { onAfterRouteChanged } from '@/theme/utils/router'

// @ts-expect-error
export { default as Layout } from './BaseLayout.vue'

export function registerGlobalComponent(app: App, router: Router) {
  app.component('user-comment', Comment)
  app.component('layout-archive', LayoutArchive)
  app.component('layout-tags', LayoutTags)
  app.component('layout-article-feed', LayoutArticleFeed)
  app.component('layout-archive-search', LayoutArchiveSearch)

  router.onAfterRouteChanged = onAfterRouteChanged
}
