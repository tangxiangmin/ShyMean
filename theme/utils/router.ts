import { inBrowser, type Router } from 'vitepress'
import { ref } from 'vue'

const currentUrl = ref('')
if (inBrowser) {
  currentUrl.value = window.location.href
}

export function configureDocumentNavigation(router: Router) {
  if (!inBrowser) return

  let pageLoaded = false
  let firstNavigation = true
  let documentUrl = new URL(window.location.href)

  router.onBeforeRouteChange = (to) => {
    // 首次 router.go 用于激活当前 HTML 中的 Vue 组件。
    if (firstNavigation) {
      firstNavigation = false
      return
    }
    window.location.assign(to)
    return false
  }

  router.onBeforePageLoad = (to) => {
    if (!pageLoaded) return
    const target = new URL(to, window.location.href)
    // 同一文档的锚点历史交给浏览器恢复，不重新导入页面模块。
    if (target.pathname !== documentUrl.pathname || target.search !== documentUrl.search) {
      window.location.reload()
    }
    return false
  }

  router.onAfterRouteChange = (to) => {
    if (!pageLoaded) documentUrl = new URL(to, window.location.href)
    pageLoaded = true
    currentUrl.value = to
  }
}

export function useCurrentUrl() {
  return {
    currentUrl,
  }
}
