export default {
    async about(ctx: { state: { view: string; }; }, next: () => void) {
        ctx.state.view = "about"
        await next()
    },

    async friend(ctx: { state: { view: string; }; }, next: () => void) {
        ctx.state.view = "friend"

        await next()
    },

    async message(ctx: { state: { view: string; }; }, next: () => void) {
        ctx.state.view = "message"
        await next()
    },

    async version(ctx: { state: { view: string; }; }, next: () => void) {
        ctx.state.view = "version"
        await next()
    },
    async demo(ctx: any, next: Function) {
        ctx.state.view = "demo"
        ctx.state.data = {
            demoGroup: [
                {
                    name: '开发工具',
                    list: [{
                        name: 'Mock Server',
                        desc: '根据mock模板文件快速启动模拟数据服务器',
                        docUrl: 'https://www.npmjs.com/package/@shymean/mock-server',
                        githubUrl: 'https://github.com/tangxiangmin/mock-server#readme'
                    }, {
                        name: 'img qiniu cdn',
                        desc: '该脚本用于将markdwon文件中的本地图片上传到七牛CND',
                        githubUrl: 'https://github.com/tangxiangmin/img_qiniu_cdn'
                    }]


                },
                {
                    name: '兴趣项目',
                    list: [{
                        name: 'clean-weibo',
                        desc: '一个用于批量删除新浪微博记录的工具脚本',
                        githubUrl: 'https://github.com/tangxiangmin/clean-weibo',
                    }, {
                        name: 'petty-spider',
                        desc: '使用NodeJs一个精简的爬虫工具，满足日常的爬取需求。',
                        githubUrl: 'https://github.com/tangxiangmin/petty-spider'
                    }, {
                        name: 'petty-php',
                        desc: '使用PHP实现的一个MVC框架，包含自定义路由和中间件等功能',
                        githubUrl: 'https://github.com/tangxiangmin/petty-php'
                    }, {
                        name: 'interview',
                        desc: '日常收集的前端知识点及面试题目',
                        githubUrl: 'https://github.com/tangxiangmin/interview'
                    }, {
                        name: 'happy',
                        desc: '使用flutter实现的跨Android、iOS的客户端应用',
                        githubUrl: 'https://github.com/tangxiangmin/funny'
                    }, {
                        name: 'hexo-theme-shy',
                        desc: '当前博客同款的hexo博客主题',
                        githubUrl: 'https://github.com/tangxiangmin/hexo-theme-shy'
                    }]
                },
                {
                    name: '游戏',
                    list: [{
                        name: 'cocos creator游戏合集',
                        desc: '学习cocos creator时的一些练习demo',
                        githubUrl: 'https://github.com/cocos-creator-demo',
                    }, {
                        name: '中秋海报（移动端）',
                        desc: '2018中秋节活动，通过拖拽素材生成一张祝福海报',
                        previewUrl: 'https://g.zhe800.com/h5/poster',
                    }, /*{
                        name: '豆腐下山（移动端）',
                        desc: '2017万圣节游戏活动，操作方块获得更多分数吧~',
                        previewUrl: 'http://api.doufu.diaobao.la/halloween2017/index',
                    }*/]
                },

            ]
        }
        await next()
    }

}
