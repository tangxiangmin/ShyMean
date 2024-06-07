// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'uno.css'

// @ts-expect-error
import { Layout, registerGlobalComponent } from '@/theme'

export default {
  extends: DefaultTheme,
  Layout,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  enhanceApp({ app, router }) {
    registerGlobalComponent(app, router)
  },
} as Theme
