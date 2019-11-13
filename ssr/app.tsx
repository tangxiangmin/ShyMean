/**
 * 2019/11/1 下午10:23
 * 整个单页应用的根节点 <App />
 */
import {h, Component} from '@shymean/nezha/dist/src'

import {Router, Link} from '@shymean/nezha/dist/router'
import routes from './routes'
import {Header, Aside, Footer, Loading} from './pages/layout'

class App extends Component {
    constructor(props) {
        super(props)
        // todo 临时处理，store变化后更新整个应用
        let {store} = props.context
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    render() {
        let {url, onChange, context} = this.props
        let {showAside} = context.store.getState().global // todo fix this

        let pageClassName = ['page', 'page-theme-base']

        if (showAside) pageClassName.push('active')

        return (
            <div id="blog" class={pageClassName.join(' ')}>
                <Header/>
                <main class="page_mn">
                    <div class="container animated" id="page_wrap">
                        <Router onChange={onChange} routes={routes} url={url}/>
                    </div>
                </main>
                <Aside/>
                <Footer/>
                <Loading/>
            </div>
        )
    }
}


export default App
