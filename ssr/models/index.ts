// 通过combineReducers将整个应用拆分成多个子reducer

import {combineReducers} from '@shymean/nax'

import home from './home'
import tags from './tags'
import archive from "./archive";
import book from './book'
import friend from './friend'
import article from './article'
import globalState from "./global";

export default combineReducers({
    home,
    tags,
    archive,
    book,
    friend,
    article,
    global: globalState
})
