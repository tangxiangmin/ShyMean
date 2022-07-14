import {computed} from '@shymean/react-vue';
import {Link} from '@shymean/react-vue-router'
import {useArticleStore} from "../store/article";
import {AsyncDataParams} from "../typings";
import {getCurrentStoreInstance} from "../utils/isomorphic";

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

const TagsPage = () => {
    const store = useArticleStore()
    const categoryList = computed(() => {
        return store.categories || []
    })

    const tagList = computed(() => {
        return store.tags || []
    })

    return () => {
        const categories = categoryList.value
        const tags = tagList.value
        return (<div>
            <div class="classify">
                <div class="classify_hd">
                    当前共 {categories.length} 个分类
                </div>
                <div class="category">
                    {
                        categories.map((cate) => {
                            return <Link href={`/archive/${cate.name}`} title={cate.name}
                                         class="category_item">{cate.name} ({cate.num})</Link>
                        })
                    }
                </div>
            </div>
            <div class="classify">
                <div class="classify_hd">
                    当前共 {tags.length} 个标签
                </div>
                <div class="tag">
                    {
                        tags.map((tag) => {
                            let className: string[] = ['hover-highlight', 'tag_item', tagSize(tag.num)]
                            return <Link href={`/archive/${tag.name}`} title={tag.name}
                                         class={className.join(' ')}>{tag.name}</Link>
                        })
                    }
                </div>
            </div>
        </div>)
    }
}

TagsPage.asyncData = async ({instance}: AsyncDataParams) => {
    const store = useArticleStore(instance)
    await store.fetchTags()
}

export default TagsPage
