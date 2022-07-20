// 跳转到锚点指定位置
function catalogueJump(e: Event) {
    let link = e.target as HTMLHRElement
    if (link.classList.contains('catalogue_item')) {
        let href = link.getAttribute("href") || ''
        if (!href) return

        let target = document.getElementById(href!.substr(1))
        window.scroll(0, target!.offsetTop)

        e.preventDefault() // 避免链接跳转触发popstate
    }
}

type CatalogueProps = {
    data: any
}
export default (props: CatalogueProps) => {
    return () => {
        return (<div class="catalogue hide-md">
            <ul class="catalogue_group">
                {
                    props.data.map((h2: any) => {
                        return (
                            <li>
                                <a href={`#${h2.h2}`} class="catalogue_item">{h2.h2}</a>
                                <ul class="catalogue_group">
                                    {
                                        h2.h3.map((h3: { h3: any; }) => {
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
