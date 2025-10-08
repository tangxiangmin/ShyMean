<template>
  <div class="text-center">
    <div>
      <div class="text-xl">
        共{{ categorySize }}个分类
      </div>
      <div class="mt-20px">
        <a
          v-for="(cate, index) in categories" :key="index" :href="createArchiveLink([cate.name])"
          class="inline-block m-5px"
        >
          {{ cate.name }} ({{ cate.count }})
        </a>
      </div>
    </div>

    <div class="mt-30px">
      <div class="text-xl">
        共{{ tagSize }}个标签
      </div>
      <div class="mt-20px">
        <a
          v-for="(val, tag) in tags" :key="tag" :href="createTagLink(tag)" class="inline-block m-5px"
          :style="tagStyle(val)"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import data from '@/data/archive.json'
import { createArchiveLink, createTagLink } from '@/theme/utils'
import type { ICategoryItem } from '@/typings'

const { categories, tags } = data as { categories: ICategoryItem[], tags: Record<string, number> }

const categorySize = computed(() => {
  return Object.keys(categories).length
})

const tagSize = computed(() => {
  return Object.keys(tags).length
})

function tagStyle(num: number) {
  const fontSize = `${Math.floor(num / 2) + 12}px`
  return {
    fontSize,
  }
}
</script>
