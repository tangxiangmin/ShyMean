// 使用之前服务端渲染时的分页逻辑，处于seo考虑，暂时未提供onPageChange等接口

import {h, Component} from "nezha/dist/src";
import {Link} from "nezha/dist/router";

class Pagination extends Component {


    _setCur(index: number) {
        return index === this.props.current ? 'pagination_current' : ''
    }

    _setLink(page: number) {
        return `${this.props.router}?page=${page}`
    }

    //=== 页码 ===//
    // 首页
    first() {
        let className = `pagination_item ${this._setCur(1)}`
        return <div class={className}>
            <Link href={this._setLink(1)} class="pagination_link">1</Link>
        </div>
    }

    // 尾页
    last(totalPage) {
        let className = `pagination_item ${this._setCur(totalPage)}`
        return <div class={className}>
            <Link href={this._setLink(totalPage)} class="pagination_link">{totalPage}</Link>
        </div>
    }

    // 上一页
    prev(current) {
        let index = current - 1;

        return index ? (<div class="pagination_item">
            <Link href={this._setLink(index)} class="pagination_link">«</Link>
        </div>) : null
    }

    // 下一页
    next(current, totalPage) {
        let index = current + 1;

        return index !== totalPage ?
            (<div class="pagination_item">
                <Link href={this._setLink(index)} class="pagination_link">»</Link>
            </div>) : null
    }

    // 省略
    omit() {
        return (<div class="pagination_item">
            <span class="pagination_space">...</span>
        </div>)
    }

    // 相邻展示页面
    siblings(cur, totalPage) {

        let prev = cur - 1,
            next = cur + 1;

        let tpl = [];

        if (prev <= 1) {
            prev = Math.max(cur, 2);
        } else {
            tpl.push(this.omit())
        }

        if (next >= totalPage) {
            next = totalPage - 1;
        }

        for (let i = prev; i <= next; ++i) {
            let className = `pagination_item ${this._setCur(i)}`

            tpl.push((<div class={className}>
                <Link href={this._setLink(i)} class="pagination_link">{i}</Link>
            </div>))
        }

        if (next < totalPage - 1) {
            tpl.push(this.omit())
        }

        return tpl;
    }

    render() {
        let {total, current, router = "", size = 10} = this.props
        let totalPage = Math.ceil(total / size);

        let children = [
            this.prev(current),
            this.first(),
            ...this.siblings(current, totalPage),
            this.last(totalPage),
            this.next(current, totalPage)
        ].filter(item => !!item)

        return <nav class="pagination">
            {children}
        </nav>
    }
}

export default Pagination
