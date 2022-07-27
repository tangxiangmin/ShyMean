import {Link} from '@shymean/react-vue-router'
import {computed} from '@shymean/react-vue';

import {formatDate} from '../utils'
import {AsyncDataParams, ServerComponent} from "../typings";
import {useArticleStore} from "../store/article";

const Archive: ServerComponent = () => {
    const store = useArticleStore()

    const currentArchive = computed(() => {
        return store.currentArchive
    })

    return () => {
        const {total = 0, articleGroup = [], tag = ''} = currentArchive.value || {}
        const title = tag ? tag : `OK!目前共计 ${total} 篇日志，继续努力。`
        return (
            <div class="archives">
                <div class="archives_count">{title}</div>
                {
                    articleGroup.map(group => {
                        const {year, articles} = group
                        return <section>
                            <div class="archives_title"><strong>{year}</strong></div>
                            {
                                articles.map(item => {
                                    return (
                                        <div class="archives_item">
                                            <Link href={`/article/${item.title}`} title={item.title}
                                                  class="archives_link">
                                                <span
                                                    class="archives_date">{formatDate(item.created_at)}</span> {item.title}
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    })
                }
            </div>)
    }
}

Archive.asyncData = async ({instance, location}: AsyncDataParams) => {
    const {name = ''} = location.params
    const store = useArticleStore(instance)
    await store.fetchArchive({name})
}

Archive.asyncSEO = () => {
    return {
        title: '归档_shymean',
        keywords: '博客归档,shymean',
        description: '此页面统计了shymean博客文章的归档记录，用于快速索引文章列表。'
    }
}

export default Archive
