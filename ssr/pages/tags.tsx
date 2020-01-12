import {h} from "@shymean/nezha";
import {Link} from '@shymean/nezha-router'
import {connect} from '@shymean/nax'
import {getTags} from "../api";
import tag from "../../server/model/tag";

interface Tag {
    name: string,
    id: number,
    num: number
}

function tagSize(num: number) {
    let fontSize: string = ""

    if (num <= 2) {
        fontSize = "text-xs"
    } else if (num > 2 && num <= 5) {
        fontSize = "text-sm"
    } else if (num > 5 && num <= 8) {
        fontSize = "text-md"
    } else {
        fontSize = "text-lg"
    }
    return fontSize
}


const Categories = ({categories}) => {
    return (
        <div class="classify">
            <div class="classify_hd">
                当前共 {categories.length} 个分类
            </div>
            <div class="category">
                {
                    categories.map((cate: Tag) => {
                        return <Link href={`/archive/${cate.name}`} title={cate.name}
                                     class="category_item">{cate.name} ({cate.num})</Link>
                    })
                }
            </div>
        </div>
    )
}

const Tags = ({tags}) => {
    return (<div class="classify">
        <div class="classify_hd">
            当前共 {tags.length} 个标签
        </div>
        <div class="tag">
            {
                tags.map((tag: Tag) => {
                    let className: string[] = ['hover-highlight', 'tag_item', tagSize(tag.num)]
                    return <Link href={`/archive/${tag.name}`} title={tag.name}
                                 class={className.join(' ')}>{tag.name}</Link>
                })
            }
        </div>
    </div>)
}

const TagsPage = connect((state) => {
    return {
        ...state.tags
    }
})((props) => {
    const {categories = [], tags = []} = props
    return (<div>
        <Categories categories={categories}/>
        <Tags tags={tags}/>
    </div>)
})

// @ts-ignore
TagsPage.asyncData = async (store) => {
    let result = await getTags({})
    store.dispatch({
        type: 'store_tags_list',
        payload: result
    })
    return result
}

// @ts-ignore
TagsPage.serverSEO = ({categories} = {}) => {
    let name = ''
    if (Array.isArray(categories)) {
        name = categories.map(tag => tag.name).join(',')
    }

    return {
        title: '标签_shymean',
        keywords: `${name}`,
        description: '此页面用于统计shymean博客文章的分类和标签，用于筛选相关类型的文章',
    }
}


export default TagsPage

