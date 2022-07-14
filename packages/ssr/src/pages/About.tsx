import {Link} from '@shymean/react-vue-router'

export default () => {
    return () => {
        return (<div class="about">
                <section>
                    <header class="about_hd"><h3 class="about_tt">关于我 Shymean</h3></header>
                    <div class="about_ct">
                        <p>初识如管中窥豹，可见一斑；</p>
                        <p>继而抽丝拨茧，却是剪不断理还乱； </p>
                        <p>长路漫漫，一往无前，终将拨开云雾见青天。</p></div>
                </section>

                <section><h3 class="about_hd">关于博客</h3>
                    <div class="about_ct"><p>阮老师说：“博客首先是一种知识管理工具，其次才是传播工具。”</p>
                        <p>因此这个博客主要记录我正在学习的东西，难免会有问题，欢迎各位大佬指正。</p>
                    </div>
                </section>
                {/*<section><h3 class="about_hd">关于shymean</h3>*/}
                {/*    <div class="about_ct"><p>《shymean》里面，贝小帅望着刘子光说道：</p>*/}
                {/*        <p>"光哥，我以后要开一家网吧，楼上楼下几百台机子的那种"</p>*/}
                {/*    </div>*/}
                {/*</section>*/}
                <section><h3 class="about_hd">其他</h3>
                    <div class="about_ct"><p>版权声明：自由转载-非商用-保持署名。</p>
                        <p>本站文章均为本人原创，参考文章我都会在文中进行声明，也请您转载时附上署名。</p></div>
                </section>
                <section>
                    <header class="about_hd"><h3 class="about_tt">联系方式</h3></header>
                    <div class="about_ct">
                        <p>Github： <a href="https://github.com/tangxiangmin" target="_blank">@shymean</a></p>
                        <p>Email： <a href="mailto:645234650@qq.com" target="_blank">645234650@qq.com</a></p>
                        <p>留言板：<Link href='/message' title="留言">给我留言</Link></p>
                        <p>友情链接：<Link href='/friends' title="友链">友情链接</Link></p>
                        <p>掘金：<a href='https://juejin.im/user/1204720472957118' rel="nofollow" target="_blank"
                                 title="掘金-橙红年代">橙红年代</a></p>
                        <p>RSS订阅：<a href='/api/rss' target="_blank"
                                    title="rss-橙红年代">点我一下</a></p>
                    </div>
                </section>
            </div>
        )
    }
}
