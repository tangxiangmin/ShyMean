import {h, Component} from "@shymean/nezha";

class Catalogue extends Component {
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
