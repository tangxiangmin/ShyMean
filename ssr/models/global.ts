const initState = {
    showBackTop: false, // 是否展示返回顶部按钮
    pageLoading: false, // 是否展示加载动画
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'toggle_back_top':
            return {
                ...state,
                showBackTop: action.payload
            }
        case 'toggle_page_loading':
            return {
                ...state,
                pageLoading: action.payload
            }
    }
    return state
}
