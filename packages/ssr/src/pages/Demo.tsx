import {IDemoItem, ServerComponent} from "../typings";

type DemoGroup = {
    name: string,
    list: Array<IDemoItem>
}

const demoGroup: DemoGroup[] = [
    {
        name: '工具',
        list: [
            {
                name: 'Mock Server',
                desc: '根据mock模板文件快速启动模拟数据服务器',
                docUrl: 'https://www.npmjs.com/package/@shymean/mock-server',
                githubUrl: 'https://github.com/tangxiangmin/mock-server#readme'
            }, {
                name: 'oPic',
                desc: '一个使用electron构建的快速将图片上传到七牛图床的应用',
                githubUrl: 'https://github.com/tangxiangmin/oPic'
            }, {
                name: 'petty-spider',
                desc: '使用NodeJs一个精简的爬虫工具，满足日常的爬取需求。',
                githubUrl: 'https://github.com/tangxiangmin/petty-spider'
            }, {
                name: 'web-skeleton-extension',
                desc: 'Chrome扩展程序，一键生成当前网页骨架屏',
                githubUrl: 'https://github.com/tangxiangmin/web-skeleton-extension'
            }
        ]
    },
    {
        name: '项目',
        list: [
            {
                name: 'NeZha',
                desc: '一个简易的React框架',
                githubUrl: 'https://github.com/tangxiangmin/NeZha',
            }, {
                name: 'JSMagic',
                desc: '一些JavaScript功能原理实现',
                githubUrl: 'https://github.com/tangxiangmin/JSMagic',
            }, {
                name: 'clean-weibo',
                desc: '一个用于批量删除新浪微博记录的工具脚本',
                githubUrl: 'https://github.com/tangxiangmin/clean-weibo',
            }, {
                name: 'petty-php',
                desc: '使用PHP实现的一个MVC框架，包含自定义路由和中间件等功能',
                githubUrl: 'https://github.com/tangxiangmin/petty-php'
            }, {
                name: 'interview',
                desc: '日常收集的前端知识点及面试题目',
                githubUrl: 'https://github.com/tangxiangmin/interview'
            }, {
                name: 'hexo-theme-shy',
                desc: '当前博客同款的hexo博客主题',
                githubUrl: 'https://github.com/tangxiangmin/hexo-theme-shy'
            }, {
                name: 'html-file-loader',
                desc: '一个解决html-webpack-plugin中无法识别本地资源文件路径问题的loader',
                githubUrl: 'https://github.com/tangxiangmin/html-file-loader'
            }, {
                name: 'vuex-loading',
                desc: '一个简化vue中管理异步操作loading状态的vuex插件',
                githubUrl: 'https://github.com/tangxiangmin/vuex-loading'
            }, {
                name: 'vite-plugin-remote-module',
                desc: '在vite开发项目中加载http远程模块',
                githubUrl: 'https://github.com/tangxiangmin/vite-plugin-remote-module'
            }]
    },
    {
        name: '游戏',
        list: [{
            name: '合成大西瓜',
            desc: '2021年初比较火热的合成大西瓜cocos复刻版',
            githubUrl: 'https://github.com/tangxiangmin/cocos-big-watermelon',
        }, {
            name: '保卫萝卜2',
            desc: '《Cocos2d-JS游戏开发》随书教程',
            githubUrl: 'https://github.com/tangxiangmin/cocos-carrot-fantasy',
        }, {
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

const DemoGroup = ({group}: { group: DemoGroup }) => {
    return () => {
        return (<div>
            <h3>{group.name}</h3>
            <ul className="list-text">
                {
                    group.list.map(item => {
                        let previewUrl = item.previewUrl ?
                            <a href={item.previewUrl} class="text-xs hover-highlight"
                               target="_blank">预览</a> : null
                        let githubUrl = item.githubUrl ?
                            <a href={item.githubUrl} class="text-xs hover-highlight"
                               target="_blank">github</a> : null
                        let docUrl = item.docUrl ?
                            <a href={item.docUrl} target="_blank" class="text-xs hover-highlight">doc</a> : null

                        return (
                            <li class="list-text_item">
                                {item.name} : {item.desc} » {previewUrl} {githubUrl} {docUrl}
                            </li>
                        )
                    })
                }
            </ul>
        </div>)
    }
}

const Demo: ServerComponent = () => {
    return () => {
        return (<div class="demo">
            <p>这里整理了编程生涯中一些有趣的业余项目。</p>
            {
                demoGroup.map(group => {
                    return <DemoGroup group={group}/>
                })
            }
        </div>)
    }
}

Demo.asyncSEO = () => {
    return {
        title: '代码项目_shymean',
        keywords: 'demo,友链,shymean',
        description: '此页面统计了shymean博客的demo',
    }
}
export default Demo
