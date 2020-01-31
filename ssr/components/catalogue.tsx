import {h, Component} from "@shymean/nezha";

// 跳转到锚点指定位置
function catalogueJump(e) {
    let link = e.target
    if (link.classList.contains('catalogue_item')) {
        let href = link.getAttribute("href")
        let target = document.getElementById(href.substr(1))
        window.scroll(0, target.offsetTop)

        e.preventDefault() // 避免链接跳转触发popstate
    }
}

class Catalogue extends Component {
    componentDidMount() {
        window.addEventListener("click", catalogueJump)
    }

    componentWillUnmount() {
        window.removeEventListener("click", catalogueJump)
    }

    render() {
        let {data} = this.props
        return (<div class="catalogue hide-md">
            <ul class="catalogue_group">
                {
                    data.map(h2 => {
                        return (
                            <li>
                                <a href={`#${h2.h2}`} class="catalogue_item">{h2.h2}</a>
                                <ul class="catalogue_group">
                                    {
                                        h2.h3.map(h3 => {
                                            return (
                                                <li>
                                                    <a href={`#${h3.h3}`} class="catalogue_item">{h3.h3}</a>
                                                </li>)
                                        })
                                    }
                                </ul>
                            </li>)
                    })
                }
            </ul>
        </div>)
    }
}

export default Catalogue
