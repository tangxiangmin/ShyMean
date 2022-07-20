import {RouterView, createLocation, getCurrentUrl, RouteLocation} from "@shymean/react-vue-router";
import {StoreInstance} from "@shymean/react-vue-store";
import {provide} from "@shymean/react-vue";


import {routes} from './routes'

import {Header, Footer, Loading} from "./pages/Layout";
// import BackTop from "./components/BackTop";

import {PROVIDE_KEY, ServerComponent} from "./typings";
import {isBrowser} from "./utils";
import './style/blog.scss'

type AppProps = {
    url?: string,
    instance: StoreInstance,
    location?: RouteLocation
}

export function App({url, instance, location}: AppProps) {

    instance && provide(PROVIDE_KEY.storeInstance, instance)
    location && provide(PROVIDE_KEY.currentLocation, location)

    const onBeforeEach = (to: any, from: any) => {
        if (isBrowser) {
            let currentUrl = getCurrentUrl()
            let location = createLocation(currentUrl, (to && to.path) || '')

            const component = to.component as ServerComponent
            if (component && component.asyncData) {
                component.asyncData({instance, location})
            }
        }

    }

    const pageClassName = ['page', 'page-theme-base']

    return () => {
        return (<div class={pageClassName.join(' ')} id="blog">
            <Header/>
            <main class="page_mn">
                <div class="container animated" id="page_wrap">
                    <RouterView routes={routes} initUrl={url} onBeforeEach={onBeforeEach}/>
                </div>
            </main>
            <Footer/>
            <Loading pageLoading={false}/>
        </div>)
    }
}
