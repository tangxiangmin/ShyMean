import {onMounted} from "@shymean/react-vue";
import comment from "../utils/comment";
import {ServerComponent} from "../typings";

const MessageBoard: ServerComponent = () => {

    onMounted(() => {
        comment.init()
    })

    return () => {
        return <div id="vcomments"/>
    }
}

MessageBoard.asyncSEO = () => {
    return {
        title: '留言板_shymean',
        keywords: '留言板,留言,shymean',
        description: '此页面为shymean博客的留言板，用于记录访客的留言。',
    }
}


export default MessageBoard
