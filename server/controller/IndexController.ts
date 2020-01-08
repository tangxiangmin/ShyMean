import articleModel from "../model/article"
import tagModel from "../model/tag"
import bookModel from "../model/book"
//
// import Pagination from "../lib/pagination"
// import marked from "../lib/marked"
// import formatCatalogue from "../lib/catelogue"

export default {
    async index(ctx: any, next: Function) {
        let page = parseInt(ctx.params && ctx.params.page || 1, 10);
        // 分页类
        let pageSize = 10;
        let articles = await articleModel.getArticles(pageSize, page - 1);
        let {total} = await articleModel.count();
        ctx.state.data = {
            articles,
            total,
            page,
            pageSize,
        }

        ctx.state.view = "index"
        await next();
    },

    async article(ctx: any, next: () => void) {
        let title = ctx.params.title;
        let res = await articleModel.getArticleByTitle(title)
        if (res) {
            let prevArticle = await articleModel.getPrevArticle(res.created_at)
            let nextArticle = await articleModel.getNextArticle(res.created_at)
            let data = {
                title,
                article: res,
                // catalogue,
                prev: prevArticle,
                next: nextArticle
            }
            ctx.state.data = data
        } else {
            ctx.state.data = {
                title
            }
        }
        ctx.state.view = "article"
        await next()
    },

    async tags(ctx: any, next: () => void) {
        let categories = await tagModel.getCategories()
        let tags = await tagModel.getTags()

        ctx.state.data = {
            categories,
            tags
        }
        ctx.state.view = "tags"
        await next()
    },

    async archive(ctx: any, next: () => void) {
        let lists = [];
        let tag = ctx.params && ctx.params.tag;

        if (tag) {
            // 标签、分类归档
            lists = await articleModel.getArticleByTag(tag);
        } else {
            lists = await articleModel.getArchiveList();
        }

        let articleGroup: any[] = [];
        if(Array.isArray(lists) && lists.length){
            let cursor = 0;
            // 对归档按年份分组
            articleGroup[cursor] = {
                year: lists && lists[0] && lists[0].year,
                articles: []
            };

            // @ts-ignore
            Array.isArray(lists) && lists.forEach((val) => {
                if (val.year !== articleGroup[cursor].year) {
                    cursor++;
                    articleGroup[cursor] = {
                        year: val.year,
                        articles: [val]
                    };
                } else {
                    articleGroup[cursor].articles.push(val);
                }
            });
        }

        ctx.state.data = {
            articleGroup,
            total: lists && lists.length || 0,
            tag
        }
        ctx.state.view = "archive"

        await next();
    },

    async book(ctx: any, next: () => void) {
        let books = await bookModel.getBooks();
        ctx.state.data = {
            books
        }

        ctx.state.view = "book"

        await next()
    },

    // 增加文件上传，该接口用于本地上传，不公开开放
    async addArticle(data: any) {
        let {tags, content, title, abstract, created_at} = data

        try {
            // 插入文章
            let articleId = await articleModel.addArticle(content, title, created_at, abstract)
            try {
                for (let tag of tags) {
                    const {name, type} = tag
                    // 更新标签
                    let tagInfo = await tagModel.getTagByName(name)
                    let tagId
                    if (!tagInfo) {
                        tagId = await tagModel.addTag(name, type)
                    } else {
                        tagId = tagInfo.id
                    }
                    // 将标签和文章关联
                    await tagModel.bindArticleTag(tagId, articleId)
                }
                return articleId
            } catch (e) {
                console.log('标签插入失败', e)
            }
        } catch (e) {
            console.log('文章插入失败', e)
        }
    },
    // 文章更新接口
    async editArticle(data: any) {
        let {title} = data

        let article = await articleModel.getArticleByTitle(title)
        // 如果存在文章，先删除，而不是在原数据上更新
        if (article) {
            let articleId = article.id
            try {
                await articleModel.removeArticleById(articleId)
                // 然后添加新的文章
                return this.addArticle(data)
            } catch (e) {
                console.log(e)
            }
        } else {
            return this.addArticle(data)
        }
    },
    // 删除文章
    async deleteArticle(data: any) {
        let {title} = data

        let article = await articleModel.getArticleByTitle(title)
        if (article) {
            let articleId = article.id
            try {
                await articleModel.removeArticleById(articleId)
                // 然后添加新的文章
                return true
            } catch (e) {
                console.log(e)
            }
        } else {
            return Promise.reject(`未查找到${title}`)
        }
    }
}
