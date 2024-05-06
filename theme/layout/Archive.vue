<template>
  <div>
    <div class="archives">
      <div class="archives_count text-lg">
        <template v-if="tag">{{ tag }}</template>
        <template v-else-if="type">
          <template v-for="(cate, index) in categories" :key="cate">
            <template v-if="index === categories.length - 1">{{ cate }}</template>
            <a v-else :href="createArchiveLink(categories.slice(0, index + 1))">{{ cate }}</a>
            <span v-if="index !== categories.length - 1" class="mx-5px">/</span>
          </template>
        </template>
        <template v-else>OK!目前共计 {{ list.length }} 篇日志，继续努力。</template>
      </div>

      <section v-for="group in articleGroup" :key="group.year">
        <div class="archives_title">
          <strong>{{ group.year }}</strong>
        </div>
        <div class="archives_item flex" v-for="row in group.articles" :key="row.createdAt">
          <span class="archives_date line-clamp-1">{{ formatArticleDate(row.createdAt) }}</span>
          <a :href="createArticleLink(row.title)">{{ row.title }}</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IArticle } from '@/typings'
import articles from '@/data/meta.json'
import { createArchiveLink, createArticleLink, formatArticleDate, parseCategoryFomLink } from '@/theme/utils'

type Props = {
  type?: string
  tag?: string
}

const props = defineProps<Props>()

const categories = computed(() => {
  return parseCategoryFomLink(props.type ?? '')
})

const list = computed<IArticle[]>(() => {
  if (!props.type && !props.tag) return articles
  if (props.tag) {
    return articles.filter((article) => {
      return article.tags.includes(props.tag as string)
    })
  }
  const list = categories.value
  return articles.filter((article) => {
    const len = Math.min(list.length, article.categories.length)
    for (let i = 0; i < len; ++i) {
      if (list[i] !== article.categories[i]) return false
    }
    return true
  })
})

const articleGroup = computed(() => {
  const map: Record<string, IArticle[]> = {}
  for (const article of list.value) {
    const year = new Date(formatArticleDate(article.createdAt)).getFullYear()
    if (!Array.isArray(map[year])) {
      map[year] = []
    }
    map[year].push(article)
  }
  return Object.keys(map)
    .map((key) => {
      return {
        year: +key,
        articles: map[key],
      }
    })
    .sort((a, b) => b.year - a.year)
})
</script>

<style scoped lang="scss">
@use "sass:math";

// rem布局
$remwidth: 37.5;

// 网格系统
$gutter: 0;
$colNum: 12;
$breakPoint: (768px 750px) (992px 900px) (1200px 1170px) !default;
// 基础变量
$basemargin: 20px;
$basepadding: 20px;
$baseborder: 1px solid #d6d6d6;

// 颜色
$red: #ff3300;
$oragne: #cc6600;
$yellow: #ff9900;
$green: #33cc66;
$cyan: #6699ff;
$blue: #007fff;
$purple: #9900ff;
$dark: #333;
$white: #fff;
$gray: #f5f5f5;
$text-gray: #999;

$basecolor: $cyan;

// 单行
@mixin text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.archives {
  font-size: 16px;
  border-left: 4px solid $gray;

  @mixin archives-dot($r) {
    &:before {
      width: $r;
      height: $r;
      border-radius: $r;
      left: -#{math.div(($r + 4), 2)};
    }
  }

  %archives {
    position: relative;

    padding-left: $basepadding;

    &:before {
      content: '';
      position: absolute;
      z-index: 1;

      top: 0;
      bottom: 0;
      margin: auto 0;

      background: #aaa;
    }
  }

  &_count {
    @extend %archives;
    position: relative;
    top: -0.5em;

    @include archives-dot(12px);
  }

  &_title {
    font-weight: normal;
    padding-top: $basepadding * 2;
    padding-bottom: $basepadding * 2;

    @include archives-dot(10px);
    @extend %archives;
  }

  &_item {
    line-height: 3em;
    //border-bottom: 2px dashed $gray;

    @extend %archives;
    @include archives-dot(6px);
  }

  &_link {
    display: block;
    @include text-overflow;
  }

  &_date {
    font-size: 12px;
    margin-right: 15px;
    font-family: monospace;
  }
}
</style>
