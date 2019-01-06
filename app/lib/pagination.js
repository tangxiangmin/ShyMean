/**
 * 分页类
 */

class Pagination {
    constructor(total, current, router = "", size = 10){
        this.total = total;
        this.current = parseInt(current, 10);
        this.size = size;


        this.router = router;
        this.totalPage = Math.ceil(this.total/this.size);

    }

    init(){
        return this.prev() + this.first() + this.siblings() + this.last() + this.next();
    }

    _setCur(index){
        return index === this.current ? 'pagination_current' : ''
    }

    _setLink(page){
        return `${this.router}/${page}`
    }
    //=== 页码 ===//
    // 首页
    first(){
        return `<div class="pagination_item ${ this._setCur(1) }">
                    <a href="${this._setLink(1)}" class="pagination_link">1</a>
                </div>`
    }

    // 尾页
    last(){
        let last = this.totalPage;

        return `<div class="pagination_item ${ this._setCur(last) }">
                    <a href="${this._setLink(last)}" class="pagination_link">${last}</a>
                </div>`
    }

    // 上一页
    prev(){
        let index = this.current - 1;

        return index ?
            `<div class="pagination_item">
                <a href="${this._setLink(index)}" class="pagination_link">«</a>
            </div>` :  ''
    }

    // 下一页
    next(){
        let index = this.current + 1;

        return index !== this.totalPage ?
            `<div class="pagination_item">
                <a href="${this._setLink(index)}" class="pagination_link">»</a>
            </div>` :  ''
    }
    // 省略
    omit(){
        return `<div class="pagination_item">
                <span class="pagination_space">...</span>
            </div>`
    }

    // 相邻展示页面
    siblings(){
        let totalPage = this.totalPage;

        let cur = this.current,
            prev = cur - 1,
            next = cur + 1;

        let tpl = "";

        if(prev <= 1){
            prev = Math.max(cur, 2);
        }else {
            tpl += this.omit();
        }

        if (next >= this.totalPage) {
            next = this.totalPage - 1;
        }

        for (let i = prev; i <= next; ++i){
            tpl += `
                <div class="pagination_item ${ this._setCur(i) }">
                    <a href="${this._setLink(i)}" class="pagination_link">${i}</a>
                </div>`;
        }

        if (next < this.totalPage - 1){
            tpl += this.omit();
        }

        return tpl;
    }
}

module.exports = Pagination;