import {Link} from '@shymean/react-vue-router'
import {computed} from '@shymean/react-vue';

import {formatDate} from '../utils'
import {AsyncDataParams, IArticleGroup} from "../typings";
import {useArticleStore} from "../store/article";



const ArticleGroup = ({group}: { group: IArticleGroup }) => {
    const {year, articles} = group
    return () => {
        return <section>
            <div class="archives_title"><strong>{year}</strong></div>
            {
                articles.map(item => {
                    return (
                        <div class="archives_item">
                            <Link href={`/article/${item.title}`} title={item.title} class="archives_link">
                                <span class="archives_date">{formatDate(item.created_at)}</span> {item.title}
                            </Link>
                        </div>
                    )
                })
            }
        </section>
    }
}

const Archive = () => {
    const store = useArticleStore()

    const currentArchive = computed(() => {
        return store.currentArchive
    })

    return () => {
        const {total = 0, articleGroup = []} = currentArchive.value || {}
        const title = `OK!目前共计 ${total} 篇日志，继续努力。`
        return (
            <div class="archives">
                <div class="archives_count">{title}</div>
                {
                    articleGroup.map(group => {
                        return <ArticleGroup group={group}/>
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

export default Archive
