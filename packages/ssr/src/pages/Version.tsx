import {ServerComponent} from "../typings";

const versionList = [
    {
        version: '0.8',
        desc: '使用 <a href="https://github.com/tangxiangmin/react-vue" target="_blank">react-vue</a> 及vite-ssr重构博客，实现store、router等核心库，使用Docker部署'
    },
    {
        version: '0.7',
        desc: '使用 <a href="https://github.com/tangxiangmin/NeZha" target="_blank">NeZha</a> 重构博客，实现SSR、Nax、NeZhaRouter等核心库'
    },
    {
        version: '0.6',
        desc: '使用typescript重构后台项目，重写model层，并增加自动部署'
    }, {
        version: '0.5',
        desc: '重构了静态资源开发环境，优化打包部署流程，前后端同构渲染解耦'
    }, {
        version: '0.4',
        desc: '从SSR迁移到koa同构渲染，提升用户体验和页面性能，优化SEO'
    }, {
        version: '0.3',
        desc: '换了阿里云服务器，域名也已经备案了，因此尝试进一步更新，使用Vue SSR完成服务端渲染。'
    }, {
        version: '0.2',
        desc: '由于之前改动比较频繁，项目十分散乱，现在决定使用Vue-cli重写项目，包括组件和样式等部分，同时学习webpack。'
    }, {
        version: '0.1',
        desc: '后端使用PHP响应请求及提供数据，前端使用RequireJS处理Vue模块进行页面渲染和数据处理，前后端基本分离。'
    },
]

const Version: ServerComponent = () => {
    return () => {
        return (<div class="about">
                <p>相关版本代码位于<a href="https://github.com/tangxiangmin/ShyMean">github</a>对应分支上。</p>
                {
                    versionList.map(item => {
                        return (
                            <section>
                                <h3 class="about_hd">V{item.version}</h3>
                                <div class="about_ct">
                                    <p dangerouslySetInnerHTML={{__html: item.desc}}/>
                                </div>
                            </section>
                        )
                    })
                }
            </div>
        )
    }
}

Version.asyncSEO = () => {
    return {
        title: '版本_shymean',
        keywords: '版本,迭代,shymean',
        description: '此页面为shymean博客的版本迭代记录，包含历史各种版本记录。',
    }
}

export default Version
