import {h, Component} from "nezha/dist/src";

const About = () => {
    return (<div class="about">
            <section>
                <header class="about_hd"><h3 class="about_tt">关于我</h3>
                    <div><span class="btn btn-border btn-sm">钳工</span><span class="btn btn-border btn-sm">码农</span><span
                        class="btn btn-border btn-sm">假前端</span><span class="btn btn-border btn-sm">90后</span><span
                        class="btn btn-border btn-sm">95前</span><span class="btn btn-border btn-sm">游戏宅</span><span
                        class="btn btn-border btn-sm">胖子</span></div>
                </header>
                <div class="about_ct"><p>初识如管中窥豹，可见一斑；</p>
                    <p>继而抽丝拨茧，却是剪不断理还乱； </p>
                    <p>长路漫漫，一往无前，终将拨开云雾见青天。</p></div>
            </section>
            <section><h3 class="about_hd">关于博客</h3>
                <div class="about_ct"><p>阮老师说：“博客首先是一种知识管理工具，其次才是传播工具。”</p>
                    <p>因此这个博客主要记录我正在学习的东西，难免会有问题，欢迎各位大佬指正。</p>
                    <p>博客前端使用<a href="https://www.npmjs.com/package/koa">Koa</a>同构渲染，主题参考<a
                        href="http://theme-next.iissnan.com/">Next</a>，项目托管在<a
                        href="https://github.com/tangxiangmin/ShyMean">github</a>，请多多指教。</p></div>
            </section>
            <section><h3 class="about_hd">关于橙红年代</h3>
                <div class="about_ct"><p>《橙红年代》里面，贝小帅望着刘子光说道：</p>
                    <p>"光哥，我以后要开一家网吧，楼上楼下几百台机子的那种"</p>
                </div>
            </section>
            <section><h3 class="about_hd">其他</h3>
                <div class="about_ct"><p>版权声明：自由转载-非商用-保持署名。</p>
                    <p>本站文章均为本人原创，参考文章我都会在文中进行声明，也请您转载时附上署名。</p></div>
            </section>
        </div>
    )
}

export default About
