<template>
  <header>
    <nav class="flex justify-between h-60px flex items-center <sm:w-full md:w-700px lg:w-900px mx-auto <sm:(px-10px)">
      <div>
        <a href="/" class="text-30px">Shymean</a>
        <a href="/version" class="underline text-12px ml-6px">v0.9.0</a>
      </div>
      <button class="ml-auto hidden <sm:block" @click="toggle">
        {{ isEnglish ? (visible ? 'Close' : 'Menu') : (visible ? '关闭' : '导航') }}
      </button>
      <div
        class="ml-auto <sm:(hidden fixed top-60px left-0 right-0 bg-[var(--vp-c-bg)] h-[calc(100vh_-_60px)] py-20px)"
        :class="{ '!block': visible }"
      >
        <a
          v-for="nav in navs"
          :key="nav.text"
          :href="nav.url"
          :target="nav.url.startsWith('http') ? '_blank' : undefined"
          :rel="nav.url.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="inline-block py-5px px-10px hover:bg-[#e8e8e8] dark:hover:bg-dark-100 rounded-3px transition-all <sm:(block w-full text-center leading-40px mb-10px)"
          :class="{ 'font-bold': nav.active }"
          @click="hideNav"
        >
          {{ nav.text }}
        </a>
      </div>
      <SwitchDark class="ml-20px" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, ref } from 'vue'
import SwitchDark from '@/theme/components/SwitchDark.vue'

interface INav { text: string, url: string, active: boolean }

const route = useRoute()
const { frontmatter } = useData()

// 英文文章页的导航必须是英文，页面模板不与正文混用语言
const isEnglish = computed(() => frontmatter.value.lang === 'en-US')

const NAV_TEXT: Record<string, Record<string, string>> = {
  'zh-CN': { tags: '分类', archive: '归档', demo: '项目', book: '书架', about: '关于' },
  'en-US': { tags: 'Topics', archive: 'Archive', demo: 'Projects', book: 'Bookshelf', about: 'About' },
}

const navs = computed<INav[]>(() => {
  const text = NAV_TEXT[isEnglish.value ? 'en-US' : 'zh-CN']
  const list = [
    { text: text.tags, url: '/tags', active: false },
    { text: text.archive, url: '/archive', active: false },
    { text: text.demo, url: '/demo', active: false },
    { text: text.book, url: '/book', active: false },
    { text: text.about, url: '/about', active: false },
    { text: 'RSS', url: 'https://www.shymean.com/feed.rss', active: false },
  ]
  list.forEach((row) => {
    row.active = route.path === row.url
  })
  return list
})

const visible = ref(false)

function hideNav(): void {
  setTimeout(() => {
    visible.value = false
  }, 100)
}
function toggle() {
  visible.value = !visible.value
}
</script>
