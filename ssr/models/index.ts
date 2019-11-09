// 通过combineReducers将整个应用拆分成多个子reducer

import {combineReducers} from 'nezha/dist/nax'

import home from './home'
import tags from './tags'
import archive from "./archive";
import book from './book'
import article from './article'

export default combineReducers({
    home,
    tags,
    archive,
    book,
    article,
})
