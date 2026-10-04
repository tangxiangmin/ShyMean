<template>
  <div class="topics-page">
    <section>
      <div class="section-title">共{{ categories.length }}个分类</div>
      <div class="category-list">
        <a v-for="cate in categories" :key="cate.name" :href="createArchiveLink([cate.name])">
          {{ cate.name }} <span>{{ cate.count }}</span>
        </a>
      </div>
    </section>

    <section class="tags-section">
      <div class="section-title">共{{ cloudTags.length }}个标签</div>
      <div
        ref="cloudElement"
        class="tag-cloud"
        :class="{ packed: positions.length }"
        :style="positions.length ? { height: `${cloudHeight}px` } : undefined"
        aria-label="文章标签词云"
      >
        <a
          v-for="(tag, index) in cloudTags"
          :key="tag.name"
          :href="createTagLink(tag.name)"
          :title="`${tag.name}：${tag.count} 篇文章`"
          :aria-label="`${tag.name}，${tag.count} 篇文章`"
          :style="{
            '--tag-size': `${tag.size}px`,
            '--tag-color': `var(--cloud-color-${index % 5})`,
            fontWeight: tag.weight,
            left: positions[index] ? `${positions[index].x}px` : undefined,
            top: positions[index] ? `${positions[index].y}px` : undefined,
          }"
        >
          {{ tag.name }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import data from '@/data/archive.json'
import { createArchiveLink, createTagLink } from '@/theme/utils'
import type { ICategoryItem } from '@/typings'

interface ICloudPosition {
  x: number
  y: number
  width: number
  height: number
}

const { categories, tags } = data as { categories: ICategoryItem[], tags: Record<string, number> }
const cloudElement = ref<HTMLElement | null>(null)
const positions = ref<ICloudPosition[]>([])
const cloudHeight = ref(0)
const cloudWidth = ref(900)
const maxCount = Math.max(1, ...Object.values(tags))
const cloudTags = computed(() => Object.entries(tags)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => {
    const weight = Math.log1p(count) / Math.log1p(maxCount)
    return {
      name,
      count,
      size: Math.round(13 + weight ** 2 * (cloudWidth.value < 500 ? 23 : 39)),
      weight: count >= maxCount / 4 ? 650 : 450,
    }
  }))

let observer: ResizeObserver | undefined
let frame = 0
let disposed = false
let measuredWidth = 0

function arrangeCloud() {
  const element = cloudElement.value
  if (!element) return
  const width = Math.floor(element.clientWidth)
  if (!width) return
  cloudWidth.value = width
  const context = document.createElement('canvas').getContext('2d')
  if (!context) return
  const fontFamily = getComputedStyle(element).fontFamily
  const placed: ICloudPosition[] = []
  let bottom = 0

  for (const tag of cloudTags.value) {
    context.font = `${tag.weight} ${tag.size}px ${fontFamily}`
    const wordWidth = Math.min(width, Math.ceil(context.measureText(tag.name).width) + 12)
    const wordHeight = Math.ceil(tag.size * 1.35) + 8
    let position: ICloudPosition | undefined
    // 固定螺旋顺序，避免每次进入页面时标签位置随机变化。
    for (let step = 0; step < 6000; step++) {
      const angle = step * 0.55
      const radius = 4 * Math.sqrt(step) + step * 0.12
      const candidate = {
        x: Math.round(width / 2 + Math.cos(angle) * radius - wordWidth / 2),
        y: Math.round(Math.sin(angle) * radius * 0.65 - wordHeight / 2),
        width: wordWidth,
        height: wordHeight,
      }
      if (candidate.x < 0 || candidate.x + wordWidth > width) continue
      const overlaps = placed.some(item => candidate.x < item.x + item.width + 3
        && candidate.x + wordWidth + 3 > item.x
        && candidate.y < item.y + item.height + 3
        && candidate.y + wordHeight + 3 > item.y)
      if (!overlaps) {
        position = candidate
        break
      }
    }
    // 密集或极窄布局下保证所有标签仍可见。
    position ??= { x: (width - wordWidth) / 2, y: bottom + 4, width: wordWidth, height: wordHeight }
    placed.push(position)
    bottom = Math.max(bottom, position.y + wordHeight)
  }

  const top = Math.min(0, ...placed.map(item => item.y))
  positions.value = placed.map(item => ({ ...item, y: item.y - top + 12 }))
  cloudHeight.value = bottom - top + 24
}

onMounted(() => {
  observer = new ResizeObserver(() => {
    const width = Math.floor(cloudElement.value?.clientWidth ?? 0)
    if (width === measuredWidth) return
    measuredWidth = width
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(arrangeCloud)
  })
  if (cloudElement.value) observer.observe(cloudElement.value)
  void document.fonts.ready.then(() => {
    if (!disposed) arrangeCloud()
  })
})

onBeforeUnmount(() => {
  disposed = true
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.topics-page {
  --cloud-color-0: #4056b8;
  --cloud-color-1: #247f89;
  --cloud-color-2: #8a579a;
  --cloud-color-3: #a56835;
  --cloud-color-4: #597448;
  text-align: center;
}

:global(.dark) .topics-page {
  --cloud-color-0: #a0afff;
  --cloud-color-1: #79cbd0;
  --cloud-color-2: #cf9cdd;
  --cloud-color-3: #dfb17f;
  --cloud-color-4: #aac990;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.category-list a {
  padding: 5px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
}

.category-list span {
  margin-left: 4px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.tags-section {
  margin-top: 40px;
}

.tag-cloud {
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 12px;
}

.tag-cloud.packed {
  display: block;
}

.tag-cloud a {
  display: inline-block;
  max-width: 100%;
  padding: 4px 6px;
  border-radius: 4px;
  color: var(--tag-color);
  font-size: var(--tag-size);
  line-height: 1.35;
  white-space: nowrap;
  text-decoration: none;
}

.packed a {
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-cloud a:hover,
.tag-cloud a:focus-visible,
.category-list a:hover {
  background: var(--vp-c-default-soft);
}

.tag-cloud a:focus-visible,
.category-list a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
