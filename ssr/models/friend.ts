

const initState = {
    friends: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'store_friend_list':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}
