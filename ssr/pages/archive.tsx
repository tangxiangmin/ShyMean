import {h, Component} from "nezha/dist/src";
import {Link} from 'nezha/dist/router'
import {connect} from 'nezha/dist/nax'
import {getArchiveList} from '../api'

const ArticleGroup = ({group}) => {
    const {year, articles} = group
    return (<section>
        <div class="archives_title"><strong>{year}</strong></div>
        {
            articles.map(item => {
                return (
                    <div className="archives_item">
                        <Link href={`/article/${item.title}`} title={item.title} className="archives_link">
                            <span class="archives_date">{item.created_at}</span> {item.title}
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
    let {tag, total, articleGroup = []} = props
    let title = tag ? tag : `  OK!目前共计 ${total} 篇日志，继续努力。`
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
}

export default Archive
