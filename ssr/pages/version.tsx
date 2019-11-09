import {h, Component} from "nezha/dist/src";

const Version = () => {
    return (<div class="about">
            <p>相关版本代码位于<a href="https://github.com/tangxiangmin/ShyMean">github</a>对应分支上。</p>
            <section>
                <h3 class="about_hd">V0.6</h3>
                <div class="about_ct">
                    <p>使用typescript重构后台项目，重写model层，并增加自动部署</p>
                </div>
            </section>
            <section>
                <h3 class="about_hd">V0.5</h3>
                <div class="about_ct">
                    <p>重构了静态资源开发环境，优化打包部署流程，前后端同构渲染解耦</p>
                </div>
            </section>
            <section>
                <h3 class="about_hd">V0.4</h3>
                <div class="about_ct">
                    <p>从SSR迁移到koa同构渲染，提升用户体验和页面性能，优化SEO</p>
                </div>
            </section>

            <section>
                <h3 class="about_hd">V0.3</h3>
                <div class="about_ct">
                    <p>换了阿里云服务器，域名也已经备案了，因此尝试进一步更新，使用SSR完成服务端渲染。
                    </p>
                </div>
            </section>
            <section>
                <h3 class="about_hd">V0.2</h3>
                <div class="about_ct">
                    <p>
                        由于之前改动比较频繁，项目十分散乱，现在决定使用`Vue-cli`重写相关部分，包括组件和样式等部分，同时准备学习`webpack`。
                    </p>
                </div>
            </section>
            <section>
                <h3 class="about_hd">V0.1</h3>
                <div class="about_ct">
                    <p>后端使用PHP响应请求及提供数据，前端使用JavaScript进行页面渲染和数据处理，前后端基本分离。</p>
                </div>
            </section>
        </div>
    )
}
export default Version
