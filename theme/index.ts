import type { App } from 'vue'
import type { Router } from 'vitepress'
import { defineAsyncComponent } from 'vue'

import '@/theme/global.scss'

import Comment from '@/theme/components/Comment.vue'
import Mermaid from '@/theme/components/Mermaid.vue'
import { configureDocumentNavigation } from '@/theme/utils/router'

// @ts-expect-error
export { default as Layout } from './BaseLayout.vue'

export function registerGlobalComponent(app: App, router: Router) {
  app.component('blog-mermaid', Mermaid)
  app.component('user-comment', Comment)
  app.component('layout-archive', defineAsyncComponent(() => import('@/theme/layout/Archive.vue')))
  app.component('layout-tags', defineAsyncComponent(() => import('@/theme/layout/Tags.vue')))
  app.component('layout-article-feed', defineAsyncComponent(() => import('@/theme/layout/ArticleFeed.vue')))
  app.component('layout-archive-search', defineAsyncComponent(() => import('@/theme/layout/ArchiveSearch.vue')))

  configureDocumentNavigation(router)
}
