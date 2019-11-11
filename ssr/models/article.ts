const initState = {
    article: undefined
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_article_detail':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
