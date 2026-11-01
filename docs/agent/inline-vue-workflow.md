# 内联 Vue 与页面工作流

创建或修改验证性页面时，使用项目内 [blog-inline-vue-page skill](../../.agents/skills/blog-inline-vue-page/SKILL.md)。本文件维护语法、模板与技术约定，skill 负责按任务读取上下文并执行页面生成流程。

依据：2026-10-11 静态阅读 `views/demo.md`、`views/book.md`、Vite 配置，以及本地安装的 `vite-plugin-vitepres-inline-sfc@1.0.2` 的 README 和 `dist/index.js`。下列模板未单独运行验证。

## 已实现的语法

插件匹配带配置的 Vue 围栏，将代码注册为虚拟 `.vue` 模块，再向 Markdown 页的 `<script setup>` 注入 import。

````md
```vue {"component":true,"name":"ExamplePanel"}
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">点击次数：{{ count }}</button>
</template>
```
````

| 配置 | 当前插件行为 |
| --- | --- |
| `component: true` | 开启组件编译；缺少该字段或值为假时保留原代码块 |
| `name` | 设置注入 import 的组件名；省略时按组件代码的 MD5 生成名称 |
| `lazy: true` | 删除定义围栏，不在定义位置插入组件；由正文手动放置 |
| `lazy` 省略或为假 | 在围栏原位置自动插入 `<组件名 />` |

围栏使用三个反引号、`vue`、一个空格、同一行的合法 JSON。配置必须使用双引号，不写尾逗号或 JavaScript 对象表达式。组件名使用合法的 PascalCase 标识符，同页各块名称保持唯一。

`lazy` 只控制自动插入，生成的 import 仍是静态 import。它不提供异步加载、可见区域加载或 SSR 隔离。

不需要在页面外引入该内联组件，也不需要在 `theme/index.ts` 注册它。不带配置的普通 `vue` 围栏用于展示代码。

## 两种放置方式

自动插入适合单个完整交互区域。`views/book.md` 的 `MediaLog` 使用该方式；正文不要再写 `<MediaLog />`，否则渲染两次。

手动放置适合组件出现在文字中、需要传入 props，或使用 `<ClientOnly>` 的情况：

````md
<ClientOnly>
  <ExamplePanel />
</ClientOnly>

```vue {"component":true,"name":"ExamplePanel","lazy":true}
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <button type="button" @click="count++">点击次数：{{ count }}</button>
</template>
```
````

`views/demo.md` 的 `Demo` 是现有手动放置实例。组件可以先引用、后定义。

插件还支持在 Markdown 独立行写 `>>> virtual:ExamplePanel`，将已命名组件源码恢复为普通 Vue 展示围栏。该行为来自当前 `dist/index.js`，项目已有页面未见使用；如任务需要展示源码，使用前按用户授权验证渲染。

## 页面模板

新建 `views/labs/counter.md`，预计本地路径为 `/labs/counter`。以下模板保存的是页面内容，知识库本身不会被构建为页面：

````md
---
layout: page
title: 计数器验证
description: 验证 Vue 响应式状态与按钮交互。
---

# 计数器验证

验证目标：按钮更新页面状态，重置后计数恢复为零。

```vue {"component":true,"name":"CounterExperiment"}
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function reset() {
  count.value = 0
}
</script>

<template>
  <section class="counter-experiment">
    <p aria-live="polite">当前计数：{{ count }}</p>
    <div class="counter-actions">
      <button type="button" @click="count++">增加</button>
      <button type="button" @click="reset">重置</button>
    </div>
  </section>
</template>

<style scoped>
.counter-experiment {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.counter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.counter-actions button {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

预期结果：增加按钮逐次加一，重置按钮恢复为零，刷新后状态重新初始化。
````

## 组件实现约定

- 单页的状态、事件和计算逻辑放在内联 SFC 中。出现实际跨页复用时再抽取普通 `.vue` 或工具模块，并用 `@/` 别名引入。
- 虚拟模块 ID 为 `virtual:<hash>.vue`，不保留原 Markdown 所在目录。插件没有相对路径重写；避免把 `./util` 或 `./image.png` 假定为相对 Markdown 解析。依赖使用包名或 `@/` 别名，静态资源放 `views/public/` 并用 `/...` 引用。
- 每个内联块是独立 SFC。页面脚本变量不自动成为组件内变量；通过 props 或明确的共享模块传递数据。
- 浏览器 API（`window`、`document`、`localStorage`、Canvas、`ResizeObserver` 等）在 `onMounted` 或事件回调中访问，SSR 阶段保持初始数据确定。
- 卸载时清理监听器、计时器、观察器和动画帧；路由离开后不继续运行后台逻辑。
- DOM 必需或依赖本身在服务端不可执行时考虑 `ClientOnly`。包装组件不保证其顶层静态 import 安全，第三方浏览器依赖必要时在挂载后动态引入。
- 默认使用页面内状态。持久化或外部接口须由任务需求驱动；客户端页面不可保存密钥，也不能直接运行 Node 文件系统代码。
- CSS 使用 `scoped`、组件类名、现有主题变量；同时考虑暗色和窄屏。不要为单页演示修改全局主题样式。

插件通过正则匹配围栏，复杂嵌套、额外围栏缩进或组件字符串内包含三个反引号可能影响识别。展示这种扩展语法时使用四反引号外层围栏，并保持本文件示例的换行形式。该规则依据当前插件实现；版本变更后重新检查。

## Agent 执行流程

1. 阅读根目录 `AGENTS.md` 和本文件，确认目标页面路径、验证目标、输入、操作与可观察结果。能从用户任务推断的细节直接落实；影响范围的缺失信息集中询问。
2. 检查 `views/` 下同路径文件、现有相似页面和实际需要的依赖。单页功能默认在 `views/labs/<slug>.md` 实现。
3. 选择自动插入或手动放置，声明 `layout: page`、`title` 和 `description`。写明验证目标与预期结果，完成一个可操作的最小交互。
4. 用当前源码核对 JSON 配置、名称、插入次数、导入路径、SSR 生命周期和清理逻辑。超过 3 个文件的修改先列计划；不自动新增依赖、测试、导航或全局注册。
5. 用户明确要求运行验证时，按授权启动服务或构建。`pnpm dev` 和 `pnpm build` 都会先写生成数据、重建文章软链接；操作前确认文章源和数据目录可用。
6. 用户要求浏览器检查时，打开本地页面，操作核心流程、重置和边界输入，检查刷新、路由返回、暗色和窄屏，记录实际观察。浏览器可用时保留页面和地址供用户查看。
7. 交付文件路径、页面路由、关键操作、预期结果，以及已执行和未执行的验证。产物保留本地，不提交、不部署。

## 手动验收参考

以下是按需求执行的检查项，不构成自动运行授权：

- 本地直达页面并刷新，标题、说明和交互内容可见。
- 自动插入组件只出现一次；手动放置组件在指定位置出现。
- 输入、运行、结果和重置形成完整流程；边界输入显示明确结果。
- 离开页面后监听和计时任务清理，返回后状态符合预期。
- 窄屏内容不溢出，暗色文字可读，控件支持键盘操作。
- 获授权构建时确认 SSR 和静态产物；浏览器可见不等同于构建通过。

## 后续工作流扩展

已建立 Agent 入口、语法规范、单页开发流程和项目内 `blog-inline-vue-page` skill。skill 直接编写页面文件，尚未提供实验目录索引、全局导航入口或自动脚手架脚本。积累真实页面后，可按用户需求增加这些能力；新增工具复用本文件的语法和目录约定，并同步记录实际调用方式。
