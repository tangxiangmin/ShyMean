<template>
  <div class="text-center">
    <div>
      <div class="text-xl">共{{ categorySize }}个分类</div>
      <div class="mt-20px">
        <a :href="createArchiveLink([cate.name])" class="inline-block m-5px" v-for="cate in categories" :key="cate">
          {{ cate.name }} {{ cate.count }}
        </a>
      </div>
    </div>

    <div class="mt-30px">
      <div class="text-xl">共{{ tagSize }}个标签</div>
      <div class="mt-20px">
        <a :href="createTagLink(tag)" class="inline-block m-5px" :class="tagCls(val)" v-for="(val, tag) in tags" :key="tag">
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from '@/data/archive.json'
import { computed } from 'vue'
import { createArchiveLink, createTagLink } from '@/theme/utils'
import { ICategoryItem } from '@/typings'

const { categories, tags } = data as { categories: ICategoryItem[]; tags: Record<string, number> }

const categorySize = computed(() => {
  return Object.keys(categories).length
})

const tagSize = computed(() => {
  return Object.keys(tags).length
})

function tagCls(num: number) {
  let fontSize = ''

  if (num <= 2) {
    fontSize = 'text-xs'
  } else if (num > 2 && num <= 5) {
    fontSize = 'text-sm'
  } else if (num > 5 && num <= 8) {
    fontSize = 'text-md'
  } else {
    fontSize = 'text-lg'
  }
  return fontSize
}
</script>
