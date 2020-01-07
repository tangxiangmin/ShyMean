// 留言板页面，在服务端不加载任何评论
import {h, Component} from "@shymean/nezha";
import comment from '../lib/comment'

class MessagePage extends Component {
    componentDidMount(): void {
        comment.init()
    }

    componentDidUpdate(): void {
        comment.init()
    }

    render() {
        return (<div id="vcomments"></div>)
    }
}

// @ts-ignore
MessagePage.serverSEO = ()=>{
    return {
        title: '留言板_shymean',
        keywords: '留言板,留言,橙红年代,shymean',
        description: '此页面为shymean博客的留言板，用于记录访客的留言。',
    }
}


export default MessagePage
