import {h, Component} from "@shymean/nezha";
import {Link} from '@shymean/nezha-router'
import {connect} from '@shymean/nax'
import {getArchiveList} from '../api'
import {formatDate} from '../util'

const ArticleGroup = ({group}) => {
    const {year, articles} = group
    return (<section>
        <div class="archives_title"><strong>{year}</strong></div>
        {
            articles.map(item => {
                return (
                    <div className="archives_item">
                        <Link href={`/article/${item.title}`} title={item.title} className="archives_link">
                            <span class="archives_date">{formatDate(item.created_at)}</span> {item.title}
                        </Link>
                    </div>
                )
            })
        }
    </section>)
}

const Archive = connect((state) => {
    return {
        ...state.archive
    }
})((props) => {
    let {tag, total, articleGroup = [], location} = props
    let {params} = location
    let title = params.name ? params.name : `  OK!目前共计 ${total} 篇日志，继续努力。`
    return (
        <div class="archives">
            <div class="archives_count">{title}</div>
            {
                articleGroup.map(group => {
                    return <ArticleGroup group={group}/>
                })
            }
        </div>)
})

// @ts-ignore
Archive.asyncData = async (store, location) => {
    let result = await getArchiveList(location.params)
    store.dispatch({
        type: 'store_archive_list',
        payload: result
    })
    return result
}

// @ts-ignore
Archive.serverSEO = async (data) => {
    return {
        title: '归档_shymean',
        keywords: '博客归档,shymean,shymean',
        description: '此页面统计了shymean博客文章的归档记录，用于快速索引文章列表。'
    }
}

export default Archive
