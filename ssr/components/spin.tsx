import {h, Component} from "nezha/dist/src";

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
