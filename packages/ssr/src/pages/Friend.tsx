import {computed} from "@shymean/react-vue";
import {useArticleStore} from "../store/article";
import {AsyncDataParams} from "../typings";


const Friends = () => {
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

export default Friends
