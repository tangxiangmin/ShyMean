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
        'xm':'../base/function',
        // 全局路由配置
        'router-config':'route',
        // 布局
        'index':'page/blog-index',
        'articleDetail':'page/blog-articleDetail',
        'tags':'page/blog-tags',
        'articleList':'page/blog-articleList',
        'layout':'page/layout',
        // 组件
        'pagination':'../component/pagination',
        'tab':'../component/tab',
        'catalogue':'../component/catalogue',
        'popup':'../component/popup',
    },
    name: "_blog",
    out: "../../dist/js/blog-built.js"
})