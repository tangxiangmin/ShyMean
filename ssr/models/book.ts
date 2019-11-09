

const initState = {
    books: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_book_list':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
