import {computed} from "@shymean/react-vue";
import {useArticleStore} from "../store/article";
import {AsyncDataParams, ServerComponent} from "../typings";


const Friends: ServerComponent = () => {
    const store = useArticleStore()

    const friends = computed(() => {
        return store.friendLinks || []
    })

    return () => {
        return (<div class="friend"><h3>友情链接</h3>
                <ul>
                    {
                        friends.value.map((row, index) => {
                            return (
                                <li key={index}>
                                    <a href={row.link} class="text-blue"
                                       target="_blank">{row.name}</a> »
                                    <span class="text-xs">//{row.slogan}</span>
                                </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

Friends.asyncData = async ({instance}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    await store.fetchFriendLinks()
}

Friends.asyncSEO = () => {
    return {
        title: '友情链接_shymean',
        keywords: '友情链接,友链,shymean',
        description: '此页面统计了shymean博客的友情链接，一起学习，共同进步。',
    }
}


export default Friends
