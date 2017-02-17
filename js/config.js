/**
 * Created by admin on 2017/2/11.
 */
// 整个项目的脚本路径管理

require.config({
    baseUrl:'/js',
    paths:{
        // 框架依赖
        'vue':'lib/vue',
        'vue-router':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.2.1/vue-router.min',*/'lib/vue-router'],
        'vue-resource':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.2.0/vue-resource.min',*/'lib/vue-resource.min'],
        //插件
        'marked':[/*'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min',*/'lib/marked'],
        'highlight':[/*'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min',*/'lib/highlight.pack'],
        // 辅助函数
        'xm':'base/function',
        // 全局路由配置
        'router-config':'blog/route',
        // 布局
        'index':'blog/blog-index',
        'articleDetail':'blog/blog-articleDetail',
        'tags':'blog/blog-tags',
        'articleList':'blog/blog-articleList',
        'layout':'blog/layout',
        // 组件
        'pagination':'component/pagination',
        'tab':'component/tab',
        'catalogue':'component/catalogue',

    }
});