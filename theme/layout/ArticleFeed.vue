<template>
  <div>
    <div class="mb-70px" v-for="article in paginatedList" :key="article.title">
      <h3>
        <a :href="createArticleLink(article.title)">{{ article.title }}</a>
      </h3>
      <p class="text-12px">
        发表于
        <time :datetime="article.createdAt">{{ formatArticleDate(article.createdAt) }}</time>
        <span class="mx-5px">|</span>
        分类于
        <template v-for="(cate, index) in article.categories" :key="cate">
          <a :href="createArchiveLink(article.categories.slice(0, index + 1))">{{ cate }}</a>
          <span v-if="index !== article.categories.length - 1" class="mx-5px">/</span>
        </template>
      </p>
      <div v-html="article.abstract"></div>
    </div>
    <div class="flex items-center justify-center">
      <a :href="'/page/' + i" v-for="i in total" class="flex w-30px h-30px item-center justify-center" :key="i">
        {{ i }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import articles from '@/data/meta.json'
import { computed } from 'vue'
import { IArticle } from '@/typings'
import { createArchiveLink, createArticleLink, formatArticleDate } from '@/theme/utils'

type Props = {
  page: number
}
const props = withDefaults(defineProps<Props>(), {
  page: 1,
})

const list = articles as IArticle[]
const itemsPerPage = 20
const total = Math.ceil(list.length / itemsPerPage)

const paginatedList = computed(() => {
  const start = (props.page - 1) * itemsPerPage
  const end = start + itemsPerPage
  return list.slice(start, end)
})
</script>

<style scoped></style>
