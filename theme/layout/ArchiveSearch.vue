<template>
  <div>
    <Archive :type="type" :tag="tag" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Archive from './Archive.vue'

const isBrowser = typeof window !== undefined
const tag = computed(() => {
  if (!isBrowser)
    return ''
  const us = new URLSearchParams(window?.location.search ?? '')
  return us.get('tag')
})
const type = computed(() => {
  if (!isBrowser)
    return ''
  const us = new URLSearchParams(window?.location.search ?? '')
  return us.get('type')
})
</script>
