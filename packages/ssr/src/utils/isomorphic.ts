import {inject} from "@shymean/react-vue";
import {RouteLocation, getCurrentLocation as getLocation} from "@shymean/react-vue-router";
import {StoreInstance} from "@shymean/react-vue-store";

import {isBrowser} from "./index";
import {instance} from '../store/article'
import {PROVIDE_KEY} from "../typings";

export function getCurrentLocation(): RouteLocation | undefined {
    return isBrowser ? getLocation() : inject(PROVIDE_KEY.currentLocation)
}

export function getCurrentLocationParams() {
    const location = getCurrentLocation()
    return location && location.params && location.params || {}
}

export function getCurrentLocationQuery() {
    const location = getCurrentLocation()
    return location && location.query && location.query || {}
}

export function getCurrentStoreInstance(): StoreInstance {
    return isBrowser ? instance : inject(PROVIDE_KEY.storeInstance) as StoreInstance
}

export function getStoreInitData() {
    return isBrowser ? (window.INIT_DATA || {}) : {}
}
