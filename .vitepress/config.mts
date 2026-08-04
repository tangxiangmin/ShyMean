import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

// 提前通过脚本生成
import articles from '../data/meta.json'
import pathRewrites from '../data/pathRewrites.json'
import srcExclude from '../data/srcExclude.json'

import inlineSFC from 'vite-plugin-vitepres-inline-sfc'

import { generateRSS } from '../scripts/rss'
import { applySEOToPageData } from '../scripts/seoMeta'
import type { IArticle } from '../typings'

const isProd=  process.env.NODE_ENV==='production'

const baseUrl = 'https://www.shymean.com'
const legacyDeadLinks = new Set([
  'http://localhost:3002',
  'http://localhost:5173',
  '/articles/%E5%89%8D%E7%AB%AF/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B/%E5%9C%A8webpack%E4%B8%AD%E5%9F%BA%E4%BA%8Echunk%E5%8A%A0%E8%BD%BDexternal%E5%A4%96%E9%83%A8%E4%BE%9D%E8%B5%96',
  '/articles/%E5%9C%A8webpack%E4%B8%AD%E5%9F%BA%E4%BA%8Echunk%E5%8A%A0%E8%BD%BDexternal%E5%A4%96%E9%83%A8%E4%BE%9D%E8%B5%96',
  './index',
  './NodeJS%E4%B8%ADCommonJS%E5%92%8CESModule%E6%B7%B7%E7%94%A8%E7%9A%84%E9%97%AE%E9%A2%98',
  './JavaScript%E6%A8%A1%E5%9D%97%E7%AE%A1%E7%90%86%E6%9C%BA%E5%88%B6',
  './git@github.com:tangxiangmin/ShyMean.git',
  './article/%E3%80%8A%E5%90%8C%E6%9E%84JavaScript%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0',
  './git@github.com:microsoft/vscode-node-debug2.git',
  './(https://github.com/tangxiangmin/NeZha)',
  './%5Bhttps://www.shymean.com/article/Preact%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%5D(https://www.shymean.com/article/Preact%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90)',
  './%5Bhttps://www.shymean.com/article/%E7%90%86%E8%A7%A3%E6%95%B0%E6%8D%AE%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%5D(https://www.shymean.com/article/%E7%90%86%E8%A7%A3%E6%95%B0%E6%8D%AE%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)',
  '/article/%E5%AF%B9%E8%B1%A1%E6%8F%8F%E8%BF%B0%E7%AC%A6%E4%B8%8E%E5%93%8D%E5%BA%94%E5%BC%8F%E6%95%B0%E6%8D%AE',
  '/article/JS%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E%EF%BC%88%E5%88%9D%E7%BA%A7%E7%AF%87%EF%BC%89',
  './%E8%87%AA%E5%AE%9A%E4%B9%89%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5',
  './%5Bhttps://vue-loader.vuejs.org/zh/guide/index',
  './%5Bhttp://www.nginx.cn/doc/standard/httprewrite.html%5D(http://www.nginx.cn/doc/standard/httprewrite.html)',
  './%5Bhttps://jkzhao.github.io/2018/05/03/Lua-OpenResty%E4%BF%AE%E6%94%B9response-body/%5D(https://jkzhao.github.io/2018/05/03/Lua-OpenResty%E4%BF%AE%E6%94%B9response-body/)',
  './Nuxt%20SSR%E5%BC%80%E5%8F%91%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95',
])

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShyMean",
  description: 'ShyMean 的个人技术博客，记录前端工程、源码分析、编程语言和软件开发实践。',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'ShyMean RSS', href: `${baseUrl}/feed.rss` }],
    //Cloudflare Web Analytics
    isProd ? ['script',{src:"https://static.cloudflareinsights.com/beacon.min.js",'data-cf-beacon':'{"token": "28e619c6022b4e0d8e2f531dd215486a"}'}]:null
  ].filter(Boolean),
  cleanUrls: true,
  ignoreDeadLinks: [
    url => legacyDeadLinks.has(url),
  ],
  srcExclude,
  rewrites: {
    ...pathRewrites,
  },
  sitemap: {
    hostname: baseUrl,
    transformItems(items) {
      return items.filter(item => !item.url.includes('/archive/search'))
    },
  },
  transformPageData(pageData) {
    applySEOToPageData(pageData, articles as IArticle[])
  },
  buildEnd: generateRSS,
  themeConfig: {
    socialLinks: []
  },
  srcDir: './views',
  vite: {
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      // views/article 是符号链接，保留链接路径供 VitePress 识别并编译 Markdown。
      preserveSymlinks: true,
      alias: {
        '@': path.resolve(__dirname, '../'),
        'vue/server-renderer': path.resolve(__dirname, '../node_modules/vue/server-renderer/index.mjs'),
        'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      },
    },
    plugins: [
      vueJsx(),
      inlineSFC(),
      Unocss(),
    ],
  },
})
