<template>
  <header>
    <nav class="flex justify-between h-60px flex items-center sm:w-full md:w-700px lg:w-900px mx-auto">
      <div>
        <a href="/index" class="text-30px">Shymean</a>
        <a href="/version" class="underline text-12px ml-6px">v0.9.0</a>
      </div>
      <div class="ml-auto">
        <a
          :href="nav.url"
          v-for="nav in navs"
          :key="nav.text"
          class="inline-block py-5px px-10px hover:bg-[#e8e8e8] dark:hover:bg-dark-100 rounded-3px transition-all"
          :class="{ 'font-bold': nav.active }"
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
import { computed } from 'vue'
import SwitchDark from '@/theme/components/SwitchDark.vue'

type Nav = { text: string; url: string; active: boolean }

const route = useRoute()

const navs = computed<Nav[]>(() => {
  const list = [
    { text: '分类', url: '/tags', active: false },
    { text: '归档', url: '/archive', active: false },
    { text: '项目', url: '/demo', active: false },
    { text: '书架', url: '/book', active: false },
    { text: '关于', url: '/about', active: false },
  ]
  list.forEach((row) => {
    row.active = route.path === row.url
  })
  return list
})
</script>

<style scoped></style>
