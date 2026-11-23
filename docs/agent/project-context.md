# 项目上下文

初始依据：2026-10-11 源码与依赖静态阅读。2026-11-23 补充了依赖升级、构建体积优化及本地构建、浏览器验证记录，具体范围见对应章节。

## 项目用途与技术栈

ShyMean 是个人技术博客，站点配置地址为 `https://www.shymean.com`。项目包含文章列表、归档、分类标签、书架、项目介绍、双语文章和评论。交互内容可以使用 Markdown 内联 Vue 组件。

`package.json` 声明 VitePress `^1.6.4`、Vue `^3.5.13`、VueUse core/shared `^12.4.0`、TypeScript `^5.4.5`、UnoCSS `^0.59.4`，内联插件为 `vite-plugin-vitepres-inline-sfc` `^1.0.2`。2026-11-23 实际安装 VitePress 1.6.4、Vue 3.5.40、VueUse 12.8.2 和内联插件 1.0.2，其余版本以锁文件为准。VueUse 随 VitePress 同步升级，避免保留符号链接时解析到项目旧版 shared，出现缺少 toArray 导出的构建错误。

## 源码地图

| 路径 | 职责 |
| --- | --- |
| `.vitepress/config.mts` | 页面源目录、重写、SEO、sitemap、RSS 构建钩子、Vite 插件和别名 |
| `.vitepress/codeHighlightStyles.ts` | 收集代码高亮样式、生成共享 CSS、提供开发模式样式热更新 |
| `.vitepress/prunePageModules.ts` | 整页导航构建完成后校验引用并移除完整页面 JS，保留 lean 模块 |
| `.vitepress/theme/index.ts` | 继承默认主题，接入自定义 Layout 和全局组件注册 |
| `views/` | Markdown 页面与动态路由模板 |
| `views/public/` | 静态资源，按站点根路径引用，例如 `/favicon.png` |
| `views/article`、`views/article-en` | 外部文章源的符号链接 |
| `theme/BaseLayout.vue` | 公共页头、页脚及页面布局分支 |
| `theme/layout/Article.vue` | 文章标题、日期、分类、正文、标签、译文入口、评论和目录 |
| `theme/layout/Header.vue` | 实际站点导航及移动端导航 |
| `theme/components/` | 评论、赞赏、主题切换和目录等组件 |
| `theme/composables/`、`theme/utils/` | 主题数据、目录和路由辅助逻辑 |
| `theme/index.ts` | 主题 Layout 导出、全局组件注册和路由钩子绑定 |
| `scripts/metadata.js` | 链接文章源、解析文章、生成站点数据和 llms.txt |
| `scripts/hexo2json.js` | 解析 frontmatter 与 `<!--more-->` 前的摘要 |
| `scripts/seoMeta.ts` | 页面标题、描述、canonical、语言关联和结构化数据 |
| `scripts/rss.ts` | 构建结束后生成 RSS |
| `scripts/llms.js` | 从生成数据输出站点内容索引 `views/public/llms.txt` |
| `typings/index.ts` | 文章、分类、语言、head 和译文映射类型 |
| `uno.config.ts` | Wind preset 和 variant-group transformer |
| `docs/agent/` | 本地 Agent 上下文文档 |

## 页面与主题

`.vitepress/config.mts` 设置 `srcDir: './views'` 和 `cleanUrls: true`。普通页面 `views/book.md` 对应 `/book`；新增 `views/labs/example.md` 可对应 `/labs/example`。文章 URL 由生成的重写表决定。

`theme/BaseLayout.vue` 仅判断 `frontmatter.layout === 'page'`：

- `layout: page`：直接渲染 `<Content>`，保留公共页头、页脚，适用于工具和验证页面。
- 其他值或未声明：使用 `Article.vue`，包含文章元信息、目录、评论等。

`layout: page` 不自动显示文章模板的标题；需要页面标题时在正文写 `# 标题`。当前内容容器在中等屏幕为 700px、大屏幕为 900px，移动端占满宽度。设计交互内容时避免固定宽度溢出。

全局组件在 `theme/index.ts` 注册：`user-comment`、`layout-archive`、`layout-tags`、`layout-article-feed`、`layout-archive-search`。页面内联组件由插件注入到该 Markdown 页，不需要全局注册。

### Mermaid 图表

`.vitepress/config.mts` 的 Markdown fence 渲染规则将 `mermaid` 代码围栏转换为全局组件 `blog-mermaid`，其他代码围栏沿用 VitePress 的渲染规则。文章使用标准的三反引号 `mermaid` 代码围栏，无需修改文章内容或增加组件引用。

组件位于 `theme/components/Mermaid.vue`，由 `theme/index.ts` 注册。本地不安装或打包 Mermaid。仅在含图表的页面挂载后，通过浏览器原生动态 import 加载固定版本 `https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs`；Vite 使用 `@vite-ignore` 保留远程导入。Mermaid 的相对分块由浏览器从同一 CDN 加载。多个图表复用加载 Promise，加载失败时清除 Promise，后续渲染可重新尝试。

服务端输出和客户端加载期间显示源代码。源码或暗色主题变化时重新渲染；页面切换和卸载时取消过期结果。多个图表串行完成初始化和渲染，使用 `strict` 安全级别。CDN 加载或语法错误就近显示错误信息及原始代码。没有图表的页面不请求 Mermaid CDN。本地类型仅描述组件实际调用的 initialize 和 render 接口。

2026-11-23 本轮 CDN 改动已通过本地生产构建与浏览器验证：同一文章的 4 张流程图和时序图成功生成 SVG，暗色切换后重新生成 4 张 SVG，检查期间无图表错误或控制台错误。恢复了验证前的主题设置。CDN 入口返回 HTTP 200 和允许跨域加载的响应头；未模拟 CDN 故障。

导航由 `theme/layout/Header.vue` 的 `navs` 构造，当前有分类、归档、项目、书架、关于和 RSS。增加 Markdown 页面不自动增加导航项。

`@` 指向项目根目录，Vite 与 TypeScript 都配置该别名。Vue JSX、内联 SFC、UnoCSS 在 Vite 插件列表接入。`uno.css` 和 `theme/global.scss` 由主题导入。样式可使用 UnoCSS、`<style scoped>` 和现有 VitePress CSS 变量。

## 文章源与生成数据

`scripts/metadata.js` 内硬编码了两处本地源目录：

- 中文：`/Users/tangxiangmin/github/blog-source/source/articles`。
- 英文：`/Users/tangxiangmin/github/blog-source/source/articles-en`。

脚本先尝试删除原链接，再按源目录重新创建 `views/article`、`views/article-en` 链接。源目录缺失会警告并跳过。配置保留符号链接路径 `preserveSymlinks: true`，用于识别 Markdown。

中文文章以 `title` 形成 `article/<title>`；英文以 `slug` 形成 `article/<slug>`，共用 `/article/` 命名空间。语言依据数据或 frontmatter 的 `lang`，不能按路径前缀推断。所有已发布文章路由段必须唯一。

英文文章必须有 `slug` 和 `translationOf`。后者匹配中文源文件名（不含扩展名和分类路径）。解析失败或路由冲突会抛错。`draft` 为真的文章进入排除列表，不进入已发布列表。分类、标签计数仅统计中文。

| 生成文件 | 内容 |
| --- | --- |
| `data/meta.json` | 已发布文章元信息，按日期排列 |
| `data/clientArticles.json` | 客户端列表展示字段，不含 SEO head、文章源路径等构建数据 |
| `data/archive.json` | 分类树与标签计数 |
| `data/pathRewrites.json` | 源文章路径到稳定页面路径的重写 |
| `data/srcExclude.json` | 草稿源路径 |
| `data/translations.json` | 按中英文 URL 索引的双向语言映射 |
| `data/taxonomyRoutes.json` | 分类和标签 slug 映射 |
| `data/gsc-en-filter.txt` | 英文文章 URL 的 Search Console 筛选正则 |
| `views/public/llms.txt` | 站点内容入口和最近文章链接 |

`views/page/[page].paths.ts`、`views/category/[category].paths.ts`、`views/tag/[tag].paths.ts` 负责动态页面参数。新建普通验证页面无需加入文章元数据或这些动态路由。

`views/public/llms.txt` 由脚本生成站点阅读索引。Agent 开发规则保存在根目录 `AGENTS.md` 与 `docs/agent/`，维护时分别按各自用途更新。

## SEO 与资源行为

`scripts/seoMeta.ts` 在 `transformPageData` 中统一管理标题、描述、canonical、OG/Twitter 和结构化数据。普通新页面可通过 frontmatter 的 `title`、`description` 提供内容。已列入 `PAGE_METADATA` 的页面和文章有单独的元数据来源。

该脚本会移除 frontmatter 中被其管理的 head 项，包括 `robots`，然后重建。当前只有 `archive/search.md` 被明确加上 `noindex,follow`；给新页面单独写 frontmatter robots 不能保证最终保留。当前 sitemap 仅过滤搜索页和未登记译文，验证页面不自动排除收录。若用户要求控制收录，需要同时查看 SEO 钩子和 sitemap。

`scripts/rss.ts` 通过 `buildEnd` 生成 `.vitepress/dist/feed.rss`。导航中的 RSS 使用新窗口打开。普通站内链接使用页面路由；静态非 HTML 资源应检查 VitePress 导航拦截行为。

### 构建体积优化（2026-11-23）

`.vitepress/config.mts` 开启 `metaChunk: true`，将路由哈希表和站点数据提取为所有 HTML 共用的 `metadata.*.js`。首次优化使用的 VitePress 1.1.4 将该配置标记为实验性；后续升级至 1.6.4 后继续使用并通过构建验证。

`theme/index.ts` 使用 `defineAsyncComponent` 注册归档、标签、文章列表和归档搜索组件，服务端仍渲染页面内容，浏览器按页面加载对应组件。`scripts/metadata.js` 生成 `data/clientArticles.json`，供归档和文章列表使用；完整元数据继续供 SEO、RSS 和动态路由构建使用。`theme/components/Comment.vue` 在挂载后动态导入完整 Waline 客户端，保留原有评论功能，并在异步加载完成后检查组件是否已卸载。

本轮 `pnpm build` 成功，构建耗时 78.75 秒。按文件实际字节统计，产物从 73,899,079 字节减至 53,729,689 字节，减少 27.3%；HTML 从 43,736,283 字节减至 23,758,087 字节。公共主题 JS 从 678,509 字节减至 87,885 字节，gzip 后从 220,453 字节减至 29,918 字节。分块后文件从 2052 个增至 2060 个，658 个 HTML 路径与优化前一致。

本地生产预览验证了首页、归档、分类、分类内文章跳转、Mermaid 图表和 Waline 评论界面加载，检查期间未发现浏览器控制台错误；未发送评论。客户端索引的 318 篇文章展示字段与原始元数据逐项一致。未部署、未运行类型检查或单元测试。Mermaid 继续动态加载完整包，保留全部图表支持，构建仍有大分块警告。

后续大分块实验：尝试 `mermaid.core.mjs` 并为 pnpm 第三方依赖使用真实路径解析，本地构建成功，但客户端 JS 总量仅从 28,805,708 字节减至 28,771,456 字节；主入口从 760,200 字节增至 844,939 字节，仍有 3 个超过 500 KB 的分块。该实验配置已撤回。保留浏览器 ESM 入口时，剩余大分块为 ELK（1,616,830 字节）、Mermaid 入口（760,200 字节）及 Cynefin 相关分块（677,486 字节）。这些资源随 Mermaid 图表使用按需加载，不属于首页公共主题包。未提高警告阈值或过滤警告。

最终按用户要求移除本地 Mermaid 依赖及其 Vite 别名，改为上述固定版本 CDN 异步导入。`pnpm remove mermaid` 移除了 115 个依赖包，没有新增依赖。最终 `pnpm build` 用时 39.63 秒，产物为 48,298,395 字节、2004 个文件；较上一轮减少 5,431,294 字节（10.1%），较初始产物减少约 34.6%。658 个 HTML 路径保持一致，产物没有超过 500 KB 的 JS 分块，构建未再出现大分块警告。该体积不包含浏览器从 CDN 下载的 Mermaid 资源，图表渲染依赖 CDN 可访问性。本轮未部署或提交 Git。

### 公共代码高亮样式与 VitePress 升级（2026-11-23）

核对 npm 发布标签与 VitePress 源码时，稳定版为 1.6.4，预发布版为 2.0.0-alpha.21。1.6.4 与当时主分支的高亮实现未默认将 token 内联样式收集为公共 CSS。用户随后要求升级，项目已采用 1.6.4，并同步 Vue 和 VueUse，具体安装版本见技术栈章节。

`.vitepress/codeHighlightStyles.ts` 只导出 `createCodeHighlightStyles`，供配置创建共享样式收集器。Shiki 的 `span` transformer 将包含 `--shiki-*` 的 token 样式转换为内容哈希类名，保留亮暗颜色、斜体和粗体变量；样式按类名排序去重。生产 `transformHead` 为所有页面引用同一份 `assets/code-highlight.<hash>.css`，`buildEnd` 写入该文件，并检查页面渲染阶段的样式集合保持一致。现有 RSS 构建钩子继续运行。

开发模式由 Vite 的 `transformIndexHtml` 注入 `/__code-highlight.css`，中间件返回当前样式集合；发现新样式时发送 CSS 热更新。开发样式没有写入源码或 public 目录。新增语言或高亮样式通过编译自动收集，无需手动维护固定色板。该收集器只处理代码高亮，不改写文章中的 Vue 组件样式。

最终 VitePress 1.6.4 构建用时 51.27 秒，产物为 35,940,628 字节、2006 个文件。其中 HTML 为 18,188,623 字节，JS 为 16,593,115 字节，公共高亮 CSS 为 977 字节、13 条规则。相对本轮前 48,298,395 字节减少 12,357,767 字节（25.6%），相对最初 73,899,079 字节累计减少 51.4%。没有超过 500 KB 的 JS 分块或大分块警告。

验证范围：658 个 HTML 路径保持一致；逐页核对代码块文本摘要全部一致；HTML 中没有残留 token 高亮内联样式，所有生成类名均有公共 CSS 规则，全部页面引用同一份高亮 CSS。生产浏览器验证了书架内联组件的书籍/电影切换、亮暗高亮、4 张 Mermaid 图表及评论界面加载；开发浏览器验证了首页经归档导航到代码文章后的公共高亮样式加载。检查期间无控制台错误。未运行类型检查、单元测试、lint 或格式化，未部署或提交 Git。升级后需重启已有开发进程以加载新依赖。

### 整页导航与页面模块裁剪（2026-11-23）

当前使用项目定制的整页导航，不启用 `mpa: true`，不修改 VitePress 依赖源码。`theme/utils/router.ts` 的 `configureDocumentNavigation` 由 `theme/index.ts` 调用，仅在浏览器安装公开路由钩子：首次 `router.go` 加载当前页面的 lean 模块并激活 Vue；后续 `router.go` 使用 `location.assign` 整页导航，包括首次激活尚未完成时再次点击链接的情况。页面内的书架、评论、图表及其他 Vue 交互继续运行。跨页重新加载文档时，组件状态重新初始化。

`onBeforePageLoad` 在首次页面加载完成后阻止再次导入页面模块。同一文档的锚点历史由浏览器恢复；历史事件若指向不同文档或查询参数则重新加载。页内锚点点击仍使用 VitePress 原有的锚点滚动行为，保留页头偏移。`onAfterRouteChange` 更新评论与归档查询所用的 currentUrl。

配置显式关闭 `router.prefetchLinks`。`buildEnd` 最后调用 `.vitepress/prunePageModules.ts`：先确认预取已关闭，每个完整页面模块均有对应 lean 文件，并扫描保留的 JS/HTML 是否直接引用待删除模块；全部通过后才移除完整页面模块。页面 HTML、lean 模块、公共依赖、共享 CSS、RSS 和 sitemap 保留。该定制依赖已核对的 VitePress 1.6.4 首次加载机制及产物命名，升级框架时需重新验证；它不是官方提供的 lean-only 构建开关。

最终本地构建成功，用时 40.89 秒，移除 657 个完整页面 JS。产物为 21,744,202 字节、1349 个文件，其中 JS 为 2,396,689 字节、668 个文件，包含 657 个 lean 模块。较本轮前 35,940,628 字节减少 39.5%，JS 较原 16,593,115 字节减少 85.6%；相对最初产物累计减少 70.6%。658 个 HTML 页面及逐页正文文本摘要保持一致。

生产浏览器验证了书架内联组件切换、跨页导航、浏览器返回和前进、页内锚点、锚点返回和前进、带锚点刷新、查询参数页面、4 张 Mermaid 图表及评论界面加载。锚点返回时滚动位置由 15551 恢复为 0，前进与刷新后回到目标位置。通过本地 HTTP 验证代理记录到 7 次 HTML 文档请求和 6 次 lean 请求，没有完整页面模块请求或 HTTP 错误；检查期间无浏览器控制台错误。开发预览验证了跨页、返回后内联组件继续可操作。未运行单元测试、类型检查、lint 或格式化，未部署或提交 Git。

## 命令与执行边界

下列命令用于用户授权后的本地操作；不因文档列出命令而自动执行。

| 命令 | 当前行为 |
| --- | --- |
| `pnpm dev` | 先运行 metadata 脚本，再启动 VitePress，端口 6678；会重建软链接并写生成数据 |
| `pnpm build` | 先运行 metadata 脚本，再构建到 `.vitepress/dist`，执行 RSS 等构建步骤 |
| `pnpm preview` | 预览已有构建产物；端口以终端输出为准 |
| `node scripts/metadata.js` | 单独重建文章链接、站点数据和 llms.txt |
| `pnpm seo:audit` | 运行 SEO 审计脚本 |

Vite 开发服务器配置 `host: '0.0.0.0'`。本机浏览地址通常为 `http://localhost:6678`；该配置也会监听其他网络接口。

`package.json` 的 `init` 指向 `scripts/index.ts`，当前文件清单中没有该文件，不能按旧 README 假定可用。`scripts/setupFile.js` 会修改外部文章源的 frontmatter，不用于普通页面开发。

`deploy` 脚本会构建并通过 Wrangler 上传 Cloudflare Pages，受制品不上云约束，禁止默认执行。现有 README 中的部署和安装说明不构成用户授权。

## 后续扩展约定

新增验证性页面使用 `views/labs/<slug>.md`，优先单页内联组件。此目录约定在本次知识库中建立，尚无对应实验索引、导航或页面。共享组件只有在出现实际复用时再抽取。新功能是否需要索引、导航、持久化、外部接口或收录策略，按具体任务决定。
