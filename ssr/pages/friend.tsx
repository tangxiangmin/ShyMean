import {h, Component} from "@shymean/nezha";


const Friend = () => {
    return (<div class="friend"><h3>友情链接</h3>
            <ul>
                <li><a href="http://ccbaba.cn/" class="text-blue" target="_blank">Chasen</a> » <span
                    class="text-xs">//Todo</span></li>
                <li><a href="https://qdovo.com" class="text-blue" target="_blank">qdovo</a> » <span
                    class="text-xs">论一个前端工程师的自我修养</span></li>
                <li><a href="http://www.taoweng.site" class="text-blue" target="_blank">桃园</a> » <span class="text-xs">相信 W3C，遵从黑客文化，相信自己能改变世界</span></li>
            </ul>
        </div>
    )
}
// @ts-ignore
Friend.serverSEO = ()=>{
    return {
        title: '友情链接_shymean',
        keywords: '友情链接,友链,shymean,shymean',
        description: '此页面统计了shymean博客的友情链接，一起学习，共同进步。',
    }
}

export default Friend
