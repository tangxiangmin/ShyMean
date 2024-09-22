<template>
  <div class="VPDoc">
    <div class="fixed left-10px top-10px">
      侧边栏
    </div>
    <main class="vp-doc <sm:px-15px">
      <div>
        <h1 class="text-center">
          {{ page.title }}
        </h1>
        <div class="text-14px my-20px text-center">
          发布于
          <time :datetime="frontmatter.date">{{ formatArticleDate(frontmatter.date) }}</time>
          <span class="mx-10px">|</span>
          分类于
          <template v-for="(cate, index) in frontmatter.categories" :key="cate">
            <a :href="createArchiveLink(frontmatter.categories.slice(0, index + 1))">{{ cate }}</a>
            <span v-if="index !== frontmatter.categories.length - 1" class="mx-5px">/</span>
          </template>
          <template v-if="frontmatter.ai">
            <span class="mx-10px">|</span>
            <span class="text-[#e6a23c]">本文包含AIGC内容</span>
          </template>
        </div>

        <Content />

        <div class="text-14px">
          <a
            v-for="tag in frontmatter.tags"
            :key="tag"
            :href="createTagLink(tag)"
            class="inline-block bg-[#f5f5f5] hover:bg-[#f6f8fa] dark:bg-dark-300 dark:hover:dark-900 py-5px px-10px mr-8px cursor-pointer"
          >
            #{{ tag }}
          </a>
        </div>
      </div>
      <Appreciate class="mt-50px" />
      <Comment class="mt-50px" />
    </main>
    <div
      class="h-40px w-40px fixed bottom-0 z-10 bg-[var(--vp-c-bg)] items-center justify-center right-10px bottom-10px <sm:flex hidden text-12px opacity-50"
      @click="toggle"
    >
      {{ visible ? '关闭' : '目录' }}
    </div>

    <aside
      class="fixed right-10px top-100px <sm:(-left-1px -translate-x-100vw bg-[var(--vp-c-bg)] w-100vw h-100vh top-0 z-9 transform transition-all)"
      :class="{ '!translate-x-0': visible }"
      @click="hideNav"
    >
      <VPDocAsideOutline class="relative z-9" />
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress'
import { ref } from 'vue'
import VPDocAsideOutline from '../components/VPDocAsideOutline.vue'

import Comment from '../components/Comment.vue'
import Appreciate from '../components/Appreciate.vue'
import { createArchiveLink, createTagLink, formatArticleDate } from '@/theme/utils'

const { page, frontmatter } = useData()

const visible = ref(false)

function hideNav() {
  visible.value = false
}
function toggle() {
  visible.value = !visible.value
}
</script>
