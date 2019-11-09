const initState = {
    articleGroup: [],
    total: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_archive_list':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
