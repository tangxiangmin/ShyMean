<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="leading-28px py-20px">
    <div class="mt-auto sm:w-full md:w-700px lg:w-900px mx-auto mt-50px">
      <p>世人的悲欢并不相通，我只是觉得他们吵闹。</p>
      <p class="text-14px">
        Copyright © Shymean 2016 - {{ currentYear }}
        <a href="https://beian.miit.gov.cn" rel="nofollow" target="_blank">蜀ICP备2023029820号</a>
      </p>
    </div>
  </footer>
</template>
