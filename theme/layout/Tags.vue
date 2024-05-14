<template>
  <div class="text-center">
    <div>
      <div class="text-xl">
        共{{ categorySize }}个分类
      </div>
      <div class="mt-20px">
        <a v-for="(cate, index) in categories" :key="index" :href="createArchiveLink([cate.name])" class="inline-block m-5px">
          {{ cate.name }} ({{ cate.count }})
        </a>
      </div>
    </div>

    <div class="mt-30px">
      <div class="text-xl">
        共{{ tagSize }}个标签
      </div>
      <div class="mt-20px">
        <a v-for="(val, tag) in tags" :key="tag" :href="createTagLink(tag)" class="inline-block m-5px" :class="tagCls(val)">
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

function tagCls(num: number) {
  let fontSize = ''

  if (num <= 2)
    fontSize = 'text-xs'
  else if (num > 2 && num <= 5)
    fontSize = 'text-sm'
  else if (num > 5 && num <= 8)
    fontSize = 'text-md'
  else
    fontSize = 'text-lg'

  return fontSize
}
</script>
