# 项目上下文

依据：2026-10-11 当前仓库源码和本地安装依赖的静态阅读。本次未运行开发服务、构建或浏览器验证。

## 项目用途与技术栈

ShyMean 是个人技术博客，站点配置地址为 `https://www.shymean.com`。项目包含文章列表、归档、分类标签、书架、项目介绍、双语文章和评论。交互内容可以使用 Markdown 内联 Vue 组件。

`package.json` 声明 VitePress `^1.1.3`、Vue `^3.4.25`、TypeScript `^5.4.5`、UnoCSS `^0.59.4`，内联插件为 `vite-plugin-vitepres-inline-sfc` `^1.0.2`。这些是声明范围，实际安装版本以本地依赖和锁文件为准。本次读取的内联插件安装目录为 `1.0.2`。

## 源码地图

| 路径 | 职责 |
| --- | --- |
| `.vitepress/config.mts` | 页面源目录、重写、SEO、sitemap、RSS 构建钩子、Vite 插件和别名 |
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
