import * as Nax from 'nezha/dist/nax'

import reducer from './models'

// 在服务端需要保证每个请求返回的都是不同的store
export function createStore(initState = {}): Nax.Store {
    return Nax.createStore(reducer, initState);
}
