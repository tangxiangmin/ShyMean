// 使用之前服务端渲染时的分页逻辑，处于seo考虑，暂时未提供onPageChange等接口
import {Link} from "@shymean/react-vue-router";
import {onUpdated, watch} from '@shymean/react-vue'

type PaginationProps = {
    current: number,
    router: string,
    total: number,
    size: number
}

export default (props: PaginationProps) => {
    const _setCur = (index: number) => {
        return index === props.current ? 'pagination_current' : ''
    }

    const _setLink = (page: number) => {
        return `${props.router}?page=${page}`
    }

    const first = () => {
        let className = `pagination_item ${_setCur(1)}`
        return <div class={className}>
            <Link href={_setLink(1)} class="pagination_link">1</Link>
        </div>
    }
    const last = (totalPage: number) => {
        let className = `pagination_item ${_setCur(totalPage)}`
        return <div class={className}>
            <Link href={_setLink(totalPage)} class="pagination_link">{totalPage}</Link>
        </div>
    }
    const prev = (current: number) => {
        let index = current - 1;

        return index ? (<div class="pagination_item">
            <Link href={_setLink(index)} class="pagination_link">«</Link>
        </div>) : null
    }
    const next = (current: number, totalPage: number) => {
        let index = current + 1;

        return index !== totalPage ?
            (<div class="pagination_item">
                <Link href={_setLink(index)} class="pagination_link">»</Link>
            </div>) : null
    }
    const omit = () => {
        return (<div class="pagination_item">
            <span class="pagination_space">...</span>
        </div>)
    }
    const siblings = (cur: number, totalPage: number) => {

        let prev = cur - 1,
            next = cur + 1;

        let tpl = [];

        if (prev <= 1) {
            prev = Math.max(cur, 2);
        } else {
            tpl.push(omit())
        }

        if (next >= totalPage) {
            next = totalPage - 1;
        }

        for (let i = prev; i <= next; ++i) {
            let className = `pagination_item ${_setCur(i)}`

            tpl.push((<div class={className}>
                <Link href={_setLink(i)} class="pagination_link">{i}</Link>
            </div>))
        }

        if (next < totalPage - 1) {
            tpl.push(omit())
        }

        return tpl;
    }

    return () => {
        let {total, current, router = "", size = 10} = props
        let totalPage = Math.ceil(total / size);

        let children = [
            prev(current),
            first(),
            ...siblings(current, totalPage),
            last(totalPage),
            next(current, totalPage)
        ].filter(item => !!item)

        return <nav class="pagination">
            {children}
        </nav>

    }
}
