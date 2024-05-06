<template>
  <div class="VPDoc">
    <div class="fixed left-10px top-10px">侧边栏</div>

    <main class="vp-doc">
      <div>
        <h1 class="text-center">{{ page.title }}</h1>
        <div class="text-14px my-20px text-center">
          发布于
          <time :datetime="frontmatter.date">{{ formatArticleDate(frontmatter.date) }}</time>
          <span class="mx-10px">|</span>
          分类于
          <template v-for="(cate, index) in frontmatter.categories" :key="cate">
            <a :href="createArchiveLink(frontmatter.categories.slice(0, index + 1))">{{ cate }}</a>
            <span v-if="index !== frontmatter.categories.length - 1" class="mx-5px">/</span>
          </template>
        </div>

        <Content />

        <div class="text-14px">
          <a
            :href="createTagLink(tag)"
            class="inline-block bg-[#f5f5f5] hover:bg-[#f6f8fa] dark:bg-dark-300 dark:hover:dark-900 py-5px px-10px mr-8px cursor-pointer"
            v-for="tag in frontmatter.tags"
            :key="tag"
          >
            #{{ tag }}
          </a>
        </div>
      </div>
      <Appreciate class="mt-50px" />
      <Comment class="mt-50px" />
    </main>

    <aside class="fixed right-10px top-100px">
      <VPDocAsideOutline />
    </aside>
  </div>
</template>

<script lang="ts" setup>
import VPDocAsideOutline from '../components/VPDocAsideOutline.vue'

import Comment from '../components/Comment.vue'
import Appreciate from '../components/Appreciate.vue'
import { useData } from 'vitepress'
import { createArchiveLink, createTagLink, formatArticleDate } from '@/theme/utils'

const { page, frontmatter } = useData()
</script>
