<script lang="ts" setup>
import { onMounted } from 'vue'
import { initComment } from '../utils/comment'

onMounted(() => {
  initComment()
})
</script>

<template>
  <div id="vcomments" />
</template>
