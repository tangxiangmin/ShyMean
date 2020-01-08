import {h} from "@shymean/nezha";
import {connect} from "@shymean/nax";

function scrollTop() {
    window.scroll(0, 0)
}

const backTop = ({showBackTop}) => {
    return <div class={"btn-top " + (showBackTop ? 'active' : '')} onclick={scrollTop}>↑</div>
}

const backTopCom = connect(state => {
    let globalState = state.global
    return {
        showBackTop: globalState.showBackTop,
    }
})(backTop)

export default backTopCom
