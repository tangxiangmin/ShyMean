// 留言板页面，在服务端不加载任何评论
import {h, Component} from "nezha/dist/src";
import comment from '../components/comment'

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

export default MessagePage
