<template>
  <div ref="containerRef" />
</template>

<script lang="ts" setup>
import type { WalineInstance } from '@waline/client'
import { init } from '@waline/client'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import '@waline/client/waline.css'

import { useCurrentUrl } from '@/theme/utils/router'

const DEFAULT_SERVER_URL = 'https://waline-comment-ccc72xlvn-shymeans-projects.vercel.app'

const containerRef = ref<HTMLElement>()
const { currentUrl } = useCurrentUrl()

let walineInstance: WalineInstance | undefined

function normalizeCommentPath(url: string) {
  const pathname = new URL(url, window.location.origin).pathname

  return pathname === '/' ? pathname : pathname.replace(/\/$/, '')
}

onMounted(() => {
  if (!containerRef.value)
    return

  walineInstance = init({
    el: containerRef.value,
    serverURL: import.meta.env.VITE_WALINE_SERVER_URL || DEFAULT_SERVER_URL,
    path: normalizeCommentPath(window.location.href),
    lang: 'zh-CN',
    dark: 'html.dark',
    login: 'disable',
    imageUploader: false,
    search: false,
    locale: {
      placeholder: '说点什么吧...',
    },
  })
})

watch(currentUrl, async (url) => {
  if (!walineInstance || !url)
    return

  await nextTick()
  walineInstance.update({
    path: normalizeCommentPath(url),
  })
})

onBeforeUnmount(() => {
  walineInstance?.destroy()
  walineInstance = undefined
})
</script>
