<script lang="ts">
interface IMermaid {
  initialize(config: {
    startOnLoad: boolean
    securityLevel: 'strict'
    theme: 'dark' | 'default'
    fontFamily: string
    suppressErrorRendering: boolean
  }): void
  render(id: string, source: string, container: HTMLElement): Promise<{ svg: string }>
}

const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs'
let mermaidPromise: Promise<IMermaid> | undefined

function loadMermaid(): Promise<IMermaid> {
  mermaidPromise ??= import(/* @vite-ignore */ MERMAID_URL)
    .then(module => module.default as IMermaid)
    .catch((cause) => {
      mermaidPromise = undefined
      throw cause
    })
  return mermaidPromise
}

// Mermaid 配置是共享状态，按顺序完成配置与渲染，避免多个图表相互覆盖主题。
let renderQueue: Promise<unknown> = Promise.resolve()
let nextDiagramId = 0
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

const props = defineProps<{ source: string }>()
const isDark = useDark()
const svg = ref('')
const error = ref('')
const staging = ref<HTMLDivElement>()
let revision = 0
let stopWatching: (() => void) | undefined

function scheduleRender() {
  const currentRevision = ++revision
  const source = props.source
  const dark = isDark.value
  svg.value = ''
  error.value = ''

  const job = renderQueue.then(async () => {
    if (currentRevision !== revision || !staging.value) return
    const container = staging.value
    try {
      const mermaid = await loadMermaid()
      if (currentRevision !== revision) return
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: dark ? 'dark' : 'default',
        fontFamily: 'inherit',
        suppressErrorRendering: true,
      })
      const result = await mermaid.render(`blog-mermaid-${++nextDiagramId}`, source, container)
      if (currentRevision === revision) svg.value = result.svg
    }
    catch (cause) {
      if (currentRevision === revision) {
        error.value = cause instanceof Error ? cause.message : String(cause)
      }
    }
    finally {
      container.replaceChildren()
    }
  })
  renderQueue = job.catch(() => {})
}

onMounted(() => {
  stopWatching = watch([() => props.source, isDark], scheduleRender, { immediate: true })
})

onBeforeUnmount(() => {
  revision++
  stopWatching?.()
})
</script>

<template>
  <div class="blog-mermaid" :aria-busy="!svg && !error">
    <div v-if="svg" class="blog-mermaid-diagram" v-html="svg" />
    <template v-else>
      <p v-if="error" class="blog-mermaid-error" role="alert">Mermaid 图表渲染失败：{{ error }}</p>
      <pre class="blog-mermaid-source"><code>{{ source }}</code></pre>
    </template>
    <div ref="staging" class="blog-mermaid-staging" aria-hidden="true" />
  </div>
</template>

<style scoped>
.blog-mermaid {
  position: relative;
  margin: 24px 0;
}

.blog-mermaid-diagram {
  overflow-x: auto;
  text-align: center;
}

.blog-mermaid-diagram :deep(svg) {
  display: block;
  margin: 0 auto;
}

.blog-mermaid-source {
  overflow-x: auto;
  padding: 20px;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  white-space: pre;
}

.blog-mermaid-error {
  color: var(--vp-c-danger-1);
  white-space: pre-wrap;
}

.blog-mermaid-staging {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
  pointer-events: none;
}
</style>
