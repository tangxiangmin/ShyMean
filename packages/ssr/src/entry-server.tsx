import {renderHTML, pauseTracking, resetTracking} from "@shymean/react-vue"
import {createLocation, getMatchRouteConfig} from "@shymean/react-vue-router";
import {createStoreInstance} from "@shymean/react-vue-store";

import {ITDKData, ServerComponent} from "./typings";
import {routes} from "./routes";
import {App} from "./App";

import {useArticleStore} from "./store/article";

function renderTDK(seo: ITDKData) {
    return `
<title>${seo.title}</title>
<meta name="description" content="${seo.description}">
<meta name="keywords" content="${seo.keywords}">
`
}

export async function render(url: string) {
    pauseTracking()
    const to = getMatchRouteConfig(url, routes)
    let location = createLocation(url, (to && to.path) || '')

    if (!to) {
        return ''
    }

    const instance = createStoreInstance()

    const component = to.component as ServerComponent

    let seoData: ITDKData | undefined

    if (component) {
        if (component.asyncData) {
            await component.asyncData({instance, location})
        }

        if (component.asyncSEO) {
            seoData = await component.asyncSEO({instance, location})
        }
    }

    if (!seoData) {
        seoData = {
            title: 'shymean',
            description: 'Author: shymean, Category: IT Blog, Name: shymean, shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。',
            keywords: 'shymean,shymean,前端开发,个人博客,HTML,CSS,JavaScript,React,Vue,NodeJS,PHP,Java,Docker',
        }
    }

    const store = useArticleStore(instance)

    try {
        return {
            // @ts-ignore
            html: renderHTML(<App url={url} instance={instance} location={location}/>),
            initData: JSON.stringify(store),
            seoData: renderTDK(seoData)
        }
    } finally {
        resetTracking()
    }
}
