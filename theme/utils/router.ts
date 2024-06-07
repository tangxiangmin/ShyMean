import { inBrowser } from 'vitepress'
import { ref } from 'vue'

const currentUrl = ref('')
if (inBrowser) {
  currentUrl.value = window.location.href
}

export function onAfterRouteChanged(to: string) {
  currentUrl.value = to
}

export function useCurrentUrl() {
  return {
    currentUrl,
  }
}
