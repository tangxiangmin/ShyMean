import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

import path from 'path'

// 提前通过脚本生成
import pathRewrites from '../data/pathRewrites.json'

import inlineSFC from 'vite-plugin-vitepres-inline-sfc'

const isProd=  process.env.NODE_ENV==='production'

// rss
const baseUrl = 'https://www.shymean.com'
const RSS: RSSOptions = {
  title: 'ShyMean',
  baseUrl,
  copyright: 'Copyright (c) 2016-present, ShyMean',
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShyMean",
  description: "ShyMean's blog",
  head: [
    //Cloudflare Web Analytics
    isProd ? ['script',{src:"https://static.cloudflareinsights.com/beacon.min.js",'data-cf-beacon':'{"token": "28e619c6022b4e0d8e2f531dd215486a"}'}]:null
  ].filter(Boolean),
  cleanUrls: true,
  ignoreDeadLinks: true, // 忽略
  rewrites: {
    ...pathRewrites,
  },
  themeConfig: {
    socialLinks: []
  },
  srcDir: './views',
  vite: {
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': path.resolve(__dirname, '../'),
      },
    },
    plugins: [
      vueJsx(),
      inlineSFC(),
      Unocss(),
      RssPlugin(RSS)
    ],
  },
})
