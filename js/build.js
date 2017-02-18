({
    baseUrl: './',
    paths: {
        'vue':"empty:",
        'vue-router':"empty:",
        'vue-resource':"empty:",
        //插件
        'marked':"empty:",
        'highlight':"empty:",
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
    },
    name: "blog",
    out: "blog-built.js"
})