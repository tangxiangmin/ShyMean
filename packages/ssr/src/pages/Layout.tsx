import {ref} from "@shymean/react-vue";
import {Link} from "@shymean/react-vue-router";


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

const Spin = ({show}: { show: boolean }) => {
    return () => {
        return (
            <div class={'page_loading ' + (show ? 'active' : '')}>
                <div class="loading">
                    {
                        [1, 2, 3, 4, 5].map(i => {
                            return (<span/>)
                        })
                    }
                </div>
            </div>)
    }

}

const Header = () => {
    const isResponsive = ref<boolean>(false)
    const toggleNav = () => {
        isResponsive.value = !isResponsive.value
    }
    return () => {
        const flag = isResponsive.value
        return <header class="page_hd ">
            <div class="container header">
                <h1 class="logo">
                    <Link href="/" title="Shymean">Shymean</Link>
                    <Link href="/version" title="博客版本记录" class="version">
                        <sub>V0.8.0</sub>
                    </Link>
                </h1>
                <div class="show-md">
                    <div class={'btn-list ' + (flag ? 'close' : '')} onclick={toggleNav}>
                        <div class="btn-icon">
                            {
                                [1, 2, 3].map(i => {
                                    return (<span class="btn-line"/>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <nav class={'nav-responsive ' + (flag ? 'active' : '')}>
                    {
                        navList.map(({url, name, icon}) => {
                            return (<Link href={url} title={name} class="nav_item">
                                {name}
                            </Link>)
                        })
                    }
                </nav>
            </div>
        </header>
    }
}


const Footer = () => {
    let currentYear = new Date().getFullYear()
    return () => {
        return (<footer class="page_ft">
                <div class="container footer">
                    <p>世人的悲欢并不相通，我只是觉得他们吵闹。</p>
                    <p>
                        Copyright © Shymean 2016 - {currentYear}
                        <a href="http://www.beian.miit.gov.cn" rel="nofollow" target="_blank">蜀ICP备19012392号</a>
                    </p>
                </div>
            </footer>
        )
    }

}


const Loading = ({pageLoading}: { pageLoading: boolean }) => {
    return () => {
        return <Spin show={pageLoading}/>
    }
}

export {
    Header,
    Footer,
    Loading
}
