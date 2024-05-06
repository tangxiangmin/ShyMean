<script lang="ts" setup>
import { initComment } from '../utils/comment'
import { onMounted } from 'vue'

onMounted(() => {
  initComment()
})
</script>

<template>
  <div id="vcomments" />
</template>
