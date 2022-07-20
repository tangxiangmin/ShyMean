import {computed} from "@shymean/react-vue";

import {formatDate} from "../utils";
import {useArticleStore} from "../store/article";
import {AsyncDataParams, ServerComponent} from "../typings";


const Books: ServerComponent = () => {
    const store = useArticleStore()
    const bookList = computed(() => {
        return store.books || []
    })
    return () => {
        const books = bookList.value

        return (
            <div class="container">
                <p>共计阅读{books.length}本书。</p>
                <table class="table">
                    <thead>
                    <tr class="book">
                        <th class="book_name">书名</th>
                        <th>开始阅读</th>
                        <th>结束日期</th>
                        <th>读书笔记</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map((book) => {
                            return (<tr class="book">
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
}

Books.asyncData = async ({instance}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    await store.fetchBooks()
}

Books.asyncSEO = ({instance}: AsyncDataParams) => {
    const store = useArticleStore(instance)

    const books = store.books || []
    let name = ''
    if (Array.isArray(books)) {
        name = books.reduce((acc, book) => {
            return acc += book.name + ','
        }, '')
    }
    return {
        title: '书架_shymean',
        keywords: '书架,shymean',
        description: `此页面统计了shymean博客已经阅读的技术书籍，包括${name}等书籍。`
    }
}
export default Books
