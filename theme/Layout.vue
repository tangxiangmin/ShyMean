<template>
  <div class="min-h-100vh flex flex-col pt-70px">
    <Header class="fixed top-0 left-0 w-full bg-[#f5f5f5] dark:bg-dark-900 h-60px z-9" />
    <main class="sm:w-full md:w-700px lg:w-900px mx-auto my-30px">
      <Content class="vp-doc" v-if="frontmatter.layout === 'page'" />
      <Article v-else></Article>
    </main>
    <Footer class="mt-auto bg-[#f5f5f5] dark:bg-dark-900" />
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import Footer from './layout/Footer.vue'
import Header from './layout/Header.vue'
import Article from './layout/Article.vue'

const { page, frontmatter } = useData()
</script>
