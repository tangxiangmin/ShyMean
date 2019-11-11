/**
 * 2019/11/1 下午10:23
 * 整个单页应用的根节点 <App />
 */
import {h, Component} from 'nezha/dist/src'

import {Router, Link} from 'nezha/dist/router'
import routes from './routes'
import {Header, Aside, Footer, Loading} from './pages/layout'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asideVisible: false
        }

        // todo 临时处理，store变化后更新整个应用
        let {store} = props.context
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    toggleAside = () => {
        this.setState({
            asideVisible: !this.state.asideVisible
        })
    }

    render() {
        let {url, onChange} = this.props
        let {asideVisible} = this.state
        let pageClassName = ['page', 'page-theme-base']

        if (asideVisible) pageClassName.push('active')

        return (
            <div id="blog" class={pageClassName.join(' ')}>
                <Header/>
                <main class="page_mn">
                    <div class="container animated" id="page_wrap">
                        <Router onChange={onChange} routes={routes} url={url}/>
                    </div>
                </main>
                <Aside toggleAside={this.toggleAside}/>
                <Footer/>
                <Loading/>
            </div>
        )
    }
}


export default App
