<template>
  <div class="p-20px">
    <div class="mb-20px flex items-center">
      数量：
      <input type="text" v-model="params.n" placeholder="数量" />
      速度：
      <input type="text" v-model="params.duration" placeholder="每步间隔毫秒" />
      <button class="w-[fit-content] py-4px px-10px rounded-5px bg-green-100" @click="onClick">点击运行</button>
      <button class="w-[fit-content] py-4px px-10px rounded-5px bg-green-100 ml-10px" @click="reset">重置</button>
    </div>

    <div class="flex w-400px justify-between">
      <div class="w-30px h-200px bg-purple-100 flex flex-col items-center" v-for="(item, index) in 3" :key="item">
        <div class="mt-auto"></div>
        <div
          v-for="pie in stacks[index]"
          :key="pie"
          class="h-26px leading-26px text-center rounded-4px text-white"
          :style="{ width: 60 + pie * 20 + 'px', background: colors[pie - 1] }"
        >
          {{ pie }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
function interpolateColors(startColor: string, endColor: string, n: number) {
  // 将十六进制颜色转换为 RGB 数组
  function hexToRgb(hex: string) {
    return [parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3, 5), 16), parseInt(hex.substring(5, 7), 16)]
  }

  // 将 RGB 数组转换为十六进制颜色
  function rgbToHex(rgb: number[]) {
    return (
      '#' +
      rgb
        .map(function (x) {
          return ('0' + Math.round(x).toString(16)).slice(-2)
        })
        .join('')
    )
  }

  // 获取起始颜色和终止颜色的 RGB 数组
  var startRgb = hexToRgb(startColor)
  var endRgb = hexToRgb(endColor)

  // 计算每个通道的步长
  var step: number[] = []
  for (var i = 0; i < 3; i++) {
    step.push((endRgb[i] - startRgb[i]) / (n - 1))
  }

  // 生成过渡颜色数组
  var interpolatedColors: string[] = []
  for (var j = 0; j < n; j++) {
    var interpolatedRgb = startRgb.map(function (x, index) {
      return Math.round(x + step[index] * j)
    })
    interpolatedColors.push(rgbToHex(interpolatedRgb))
  }

  return interpolatedColors
}

const params = reactive({
  duration: 500,
  n: 4,
})
const colors = ref(interpolateColors('#00CC33', '#993333', params.n))

const playing = ref(false)

watch(
  () => params,
  () => {
    reset()
  },
  { deep: true }
)

async function move(n: number, a: number, b: number, c: number) {
  if (n === 1) {
    // 将a最上面的那个，挪动到c最前面
    await stacks[c].unshift(stacks[a].shift() as number)
    return
  }
  await move(n - 1, a, c, b)
  await sleep(500)
  stacks[c].unshift(stacks[a].shift() as number)
  await sleep(500)
  await move(n - 1, b, a, c)
}

const stacks = reactive<number[][]>([[], [], []])

function reset() {
  colors.value = interpolateColors('#00CC33', '#993333', params.n)
  playing.value = false
  stacks.forEach((_, index) => {
    stacks[index] = []
  })
  for (let i = 1; i <= params.n; ++i) {
    stacks[0].push(i)
  }
}

reset()

function onClick() {
  if (playing.value) return
  playing.value = true
  move(params.n, 0, 1, 2)
}
</script>
