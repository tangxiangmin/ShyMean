import {onMounted} from "@shymean/react-vue";
import comment from "../utils/comment";

const MessageBoard = () => {

    onMounted(() => {
        comment.init()
    })

    return () => {
        return <div id="vcomments"/>
    }
}


export default MessageBoard
