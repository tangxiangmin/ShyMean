// 首页数据

const initState = {
    articles: [],
    searchParams: {
        page: 1,
        perPage: 10
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_index_list':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
