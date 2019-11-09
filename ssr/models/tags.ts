const initState = {
    tags: [],
    categories: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_tags_list':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
