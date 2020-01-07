import {h, Component} from "@shymean/nezha";
import {Link} from '@shymean/nezha-router'
import {connect} from '@shymean/nax'
import {getBookList} from "../api";

import {formatDate} from "../util";

const BookList = ({books = []}) => {
    return (
        <div class="container">
            <p>共计阅读{books.length}本书。</p>
            <table class="table">
                <thead>
                <tr>
                    <th>书名</th>
                    <th>开始阅读</th>
                    <th>结束日期</th>
                    <th>状态</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map((book, index) => {
                        return (<tr>
                            <td>{book.name}</td>
                            <td>{formatDate(book.created_at)}</td>
                            <td>{book.ended_at && formatDate(book.ended_at) || '~'}</td>
                            <td>{book.note}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

const BookPage = connect((state) => {
    return {
        ...state.book
    }
})(BookList)

// @ts-ignore
BookPage.asyncData = async (store) => {
    let result = await getBookList({})
    store.dispatch({
        type: 'store_book_list',
        payload: result
    })
    return result
}

// @ts-ignore
BookPage.serverSEO = async ({books}) => {
    let name = ''
    if (Array.isArray(books)) {
        name = books.reduce((acc, book) => {
            return acc += book.name + ','
        }, '')
    }
    return {
        title: '书架_shymean',
        keywords: '书架,shymean,橙红年代',
        description: `此页面统计了shymean博客已经阅读的技术书籍，包括${name}等书籍。`
    }
}

export default BookPage
