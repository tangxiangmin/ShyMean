<template>
  <header>
    <nav class="flex justify-between h-60px flex items-center <sm:w-full md:w-700px lg:w-900px mx-auto <sm:(px-10px)">
      <div>
        <a href="/index" class="text-30px">Shymean</a>
        <a href="/version" class="underline text-12px ml-6px">v0.9.0</a>
      </div>
      <button class="ml-auto hidden <sm:block" @click="toggle">
        {{ visible ? '关闭' : '导航' }}
      </button>
      <div
        class="ml-auto <sm:(hidden fixed top-60px left-0 right-0 bg-[var(--vp-c-bg)] h-[calc(100vh_-_60px)] py-20px)"
        :class="{ '!block': visible }"
      >
        <a
          v-for="nav in navs"
          :key="nav.text"
          :href="nav.url"
          class="inline-block py-5px px-10px hover:bg-[#e8e8e8] dark:hover:bg-dark-100 rounded-3px transition-all <sm:(block w-full text-center leading-40px mb-10px)"
          :class="{ 'font-bold': nav.active }"
          @click="hideNav(nav, $event)"
        >
          {{ nav.text }}
        </a>
      </div>
      <SwitchDark class="ml-20px" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, ref } from 'vue'
import SwitchDark from '@/theme/components/SwitchDark.vue'

interface Nav { text: string, url: string, active: boolean }

const route = useRoute()

const navs = computed<Nav[]>(() => {
  const list = [
    { text: '分类', url: '/tags', active: false },
    { text: '归档', url: '/archive', active: false },
    { text: '项目', url: '/demo', active: false },
    { text: '书架', url: '/book', active: false },
    { text: '关于', url: '/about', active: false },
    { text: 'RSS', url: 'https://www.shymean.com/feed.rss', active: false },
  ]
  list.forEach((row) => {
    row.active = route.path === row.url
  })
  return list
})

const visible = ref(false)

function hideNav(nav: Nav, e: Event): void {
  if (nav.url.startsWith('http')) {
    window.open(nav.url, '_blank')
    e.preventDefault()
    e.stopPropagation()
    return
  }
  setTimeout(() => {
    visible.value = false
  }, 100)
}
function toggle() {
  visible.value = !visible.value
}
</script>
