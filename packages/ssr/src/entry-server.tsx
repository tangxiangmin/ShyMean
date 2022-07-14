import {renderHTML} from "@shymean/react-vue"
import {createLocation, getMatchRouteConfig} from "@shymean/react-vue-router";
import {createStoreInstance} from "@shymean/react-vue-store";

import {ServerComponent} from "./typings";
import {routes} from "./routes";
import {App} from "./App";

import {useArticleStore} from "./store/article";

export async function render(url: string) {

    const to = getMatchRouteConfig(url, routes)
    let location = createLocation(url, (to && to.path) || '')

    if (!to) {
        return ''
    }

    const instance = createStoreInstance()

    const component = to.component as ServerComponent
    if (component && component.asyncData) {
        await component.asyncData({instance, location})
    }

    const store = useArticleStore(instance)

    return {
        // @ts-ignore
        html: renderHTML(<App url={url} instance={instance} location={location}/>),
        initData: JSON.stringify(store)
    }
}
