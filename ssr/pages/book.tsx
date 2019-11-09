import {h, Component} from "nezha/dist/src";
import {Link} from 'nezha/dist/router'
import {connect} from 'nezha/dist/nax'
import {getBookList} from "../api";

const BookList = ({books = []}) => {
    return (
        <div class="container">
            <p>共计阅读{books.length}本书。</p>
            <table class="table">
                <thead>
                <tr>
                    <th>编号</th>
                    <th>书名</th>
                    <th>开始日期</th>
                    <th>结束日期</th>
                    <th>状态</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map((book, index) => {
                        return (<tr>
                            <td>{index}</td>
                            <td>{book.name}</td>
                            <td>{book.created_at}</td>
                            <td>{book.created_at}</td>
                            <td>{book.ended_at || '~'}</td>
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
}

export default BookPage
