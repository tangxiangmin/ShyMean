import {h, Component} from "@shymean/nezha";
import {Link} from '@shymean/nezha-router'
import {connect} from '@shymean/nax'
import Spin from '../components/spin'


function createNav(url: string, name: string, icon: string) {
    return {
        url, name, icon
    }
}

const navList = [
    createNav('/tags', '标签', 'icon-tag'),
    createNav('/archive', '归档', 'icon-archives'),
    createNav('/book', '书架', 'icon-bookshelf'),
    createNav('/demo', '项目', 'icon-code'),
    createNav('/about', '关于', 'icon-info'),
]

class Header extends Component {
    state = {
        isResponsive: false
    }

    toggleNav = () => {
        this.setState({
            isResponsive: !this.state.isResponsive
        })
    }

    render() {
        let {isResponsive} = this.state
        return (<header class="page_hd">
                <div class="container header">
                    <h1 class="logo">
                        <Link href="/" title="Shymean">Shymean</Link>
                        <Link href="/version" title="博客版本记录" class="version">
                            <sub>V0.7.0</sub>
                        </Link>
                    </h1>
                    <div class="show-md">
                        <div class={'btn-list ' + (isResponsive ? 'close' : '')} onclick={this.toggleNav}>
                            <div class="btn-icon">
                                <span class="btn-line"></span>
                                <span class="btn-line"></span>
                                <span class="btn-line"></span>
                            </div>
                        </div>
                    </div>
                    <nav class={'nav-responsive ' + (isResponsive ? 'active' : '')}>
                        {
                            navList.map(({url, name, icon}) => {
                                return (<Link href={url} title={name} class="nav_item">
                                    {/*<i class={'iconfont ' + icon}></i>*/}
                                    {name}
                                </Link>)
                            })
                        }
                    </nav>
                </div>
            </header>
        )
    }
}


const Footer = () => {
    let currentYear = new Date().getFullYear()
    return (<footer class="page_ft">
            <div class="container footer">
                <p>世人的悲欢并不相通，我只是觉得他们吵闹。</p>
                <p>
                    Copyright © Shymean 2016 - {currentYear}
                    <a href="http://www.miitbeian.gov.cn" rel="nofollow" target="_blank">蜀ICP备19012392号-1</a>
                </p>

            </div>
            <div class="hide-xs">
                <script src="https://s19.cnzz.com/z_stat.php?id=1264491168&amp;web_id=1264491168"
                        language="JavaScript"></script>
            </div>
        </footer>
    )
}

const asideNavList = [
    createNav('/book', '书架', 'icon-bookshelf'),
    createNav('/message', '留言', 'icon-comment'),
    createNav('/about', '关于', 'icon-info'),
    createNav('/friend', '友链', 'icon-blog'),
]


class AsideCom extends Component {
    toggleAside = () => {
        let {dispatch, showAside} = this.props
        dispatch({
            type: 'toggle_aside',
            payload: !showAside
        })
    }

    // 返回顶部
    backTop = () => {
        window.scroll(0, 0)
    }

    render() {
        let {showBackTop, showAside} = this.props

        return (<aside>
            <div class="page_sd hide-md">
                <div class="me">
                    <img src="/img/avatar.jpeg" alt="shymean" width="100" height="100"/>
                    <h3>shymean</h3>
                    <p>一个不学无术且无趣的人。</p>
                </div>
                <div class="nav-border">
                    {
                        asideNavList.map(({url, name, icon}) => {
                            return (<Link href={url} title={name} class="nav_item">
                                <i class={'iconfont ' + icon}/> <br/>
                                {name}
                            </Link>)
                        })
                    }
                </div>
                <div class="contact">
                    <a href="https://github.com/tangxiangmin" target="_blank" class="contact_link">
                        <i class="iconfont icon-github"/> GitHub</a>
                    <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes"
                       target="_blank" class="contact_link">
                        <i class="iconfont icon-qq"/> QQ</a>
                </div>
            </div>
            <div class="tool">
                <div class={'btn-list hide-md ' + (showAside ? 'close' : 'hover')} onClick={this.toggleAside}>
                    <div class="btn-icon">
                        <span class="btn-line"></span>
                        <span class="btn-line"></span>
                        <span class="btn-line"></span>
                    </div>
                </div>
                <div class={"btn-top " + (showBackTop ? 'active' : '')} onClick={this.backTop}><i
                    class="iconfont icon-top"/>
                </div>
            </div>
        </aside>)

    }
}

const Aside = connect(state => {
    let globalState = state.global
    return {
        showBackTop: globalState.showBackTop,
        showAside: globalState.showAside
    }
})(AsideCom)

const Loading = connect((state) => {
    return {
        pageLoading: state.global.pageLoading,
    }
})(({pageLoading}) => {
    return <Spin show={pageLoading}/>
})

export {
    Header,
    Aside,
    Footer,
    Loading
}
