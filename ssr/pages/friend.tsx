import {h, Component} from "@shymean/nezha";
import {getFriendList} from "../api";
import {connect} from '@shymean/nax'

const Friend = ({friends = []}) => {

    return (<div class="friend"><h3>友情链接</h3>
            <ul>
                {
                    friends.map((row, index) => {
                        return (
                            <li key={index}><a href={row.link} class="text-blue" target="_blank">{row.name}</a> » <span
                                class="text-xs">//{row.slogan}</span></li>)
                    })
                }
            </ul>
        </div>
    )
}

const FriendPage = connect((state) => {
    return {
        ...state.friend
    }
})(Friend)

// @ts-ignore
FriendPage.asyncData = async (store) => {
    let {list} = await getFriendList()
    store.dispatch({
        type: 'store_friend_list',
        payload: {
            friends: Array.isArray(list) ? list : []
        }
    })
    return list
}

// @ts-ignore
FriendPage.serverSEO = () => {
    return {
        title: '友情链接_shymean',
        keywords: '友情链接,友链,shymean,shymean',
        description: '此页面统计了shymean博客的友情链接，一起学习，共同进步。',
    }
}

export default FriendPage
