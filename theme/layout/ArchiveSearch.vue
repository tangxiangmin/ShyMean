<template>
  <div>
    <Archive :type="params.type" :tag="params.tag" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute } from 'vitepress'
import Archive from './Archive.vue'
import { useCurrentUrl } from '@/theme/utils/router'

const { currentUrl } = useCurrentUrl()
const route = useRoute()

const params = reactive({
  tag: '',
  type: '',
})

// fix: 处理vitepress同path query改变组件不更新的问题
watch(() => currentUrl.value, () => {
  // 当前在
  if (route.path === '/archive/search') {
    const us = new URLSearchParams(location.search)
    params.tag = us.get('tag') as string
    params.type = us.get('type') as string
  }
}, { immediate: true })
</script>
