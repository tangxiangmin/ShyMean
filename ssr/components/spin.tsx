import {h, Component} from "@shymean/nezha";

const Spin = ({show}) => {
    return (
        <div class={'page_loading ' + (show ? 'active' : '')}>
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>)
}

export default Spin
