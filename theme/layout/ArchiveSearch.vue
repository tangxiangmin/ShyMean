<template>
  <div>
    <Archive :type="type" :tag="tag"></Archive>
  </div>
</template>

<script setup lang="ts">
import Archive from './Archive.vue'
import { computed } from 'vue'

const isBrowser = typeof window !== undefined
const tag = computed(() => {
  if (!isBrowser) return ''
  const us = new URLSearchParams(window?.location.search ?? '')
  return us.get('tag')
})
const type = computed(() => {
  if (!isBrowser) return ''
  const us = new URLSearchParams(window?.location.search ?? '')
  return us.get('type')
})
</script>
