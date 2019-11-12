import {h, Component} from "nezha/dist/src";


const Friend = () => {
    return (<div class="friend"><h3>友情链接</h3>
            <ul>
                <li><a href="http://ccbaba.cn/" class="text-blue" target="_blank">Chasen</a> » <span
                    class="text-xs">//Todo</span></li>
                <li><a href="http://www.sanshao.top" class="text-blue" target="_blank">三少资讯网</a> » <span
                    class="text-xs">论一个前端工程师的自我修养</span></li>
            </ul>
        </div>
    )
}
// @ts-ignore
Friend.serverSEO = ()=>{
    return {
        title: '友情链接_shymean',
        keywords: '友情链接,友链,shymean,橙红年代',
        description: '此页面统计了shymean博客的友情链接，一起学习，共同进步。',
    }
}

export default Friend
