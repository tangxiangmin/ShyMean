import * as RSS from 'rss'
import articleModel from "../model/article"
import tagModel from "../model/tag"
import bookModel from "../model/book"
import friendModel from "../model/friend"
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
        if (Array.isArray(lists) && lists.length) {
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
    },
    async friends(ctx: any, next: Function) {
        let list = await friendModel.getFriendList()
        ctx.state.data = {
            list
        }
        await next()
    },

    // 支持rss，定期返回最新的文章
    // https://www.npmjs.com/package/rss
    async rss(ctx: any) {
        /* lets create an rss feed */
        var feed = new RSS({
            title: 'title',
            description: 'description',
            feed_url: 'http://example.com/rss.xml',
            site_url: 'http://example.com',
            image_url: 'http://example.com/icon.png',
            docs: 'http://example.com/rss/docs.html',
            managingEditor: 'Dylan Greene',
            webMaster: 'Dylan Greene',
            copyright: '2013 Dylan Greene',
            language: 'en',
            categories: ['Category 1', 'Category 2', 'Category 3'],
            pubDate: 'May 20, 2012 04:00:00 GMT',
            ttl: '60',
            custom_namespaces: {
                'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            },
            custom_elements: [
                {'itunes:subtitle': 'A show about everything'},
                {'itunes:author': 'John Doe'},
                {'itunes:summary': 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store'},
                {
                    'itunes:owner': [
                        {'itunes:name': 'John Doe'},
                        {'itunes:email': 'john.doe@example.com'}
                    ]
                },
                {
                    'itunes:image': {
                        _attr: {
                            href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
                        }
                    }
                },
                {
                    'itunes:category': [
                        {
                            _attr: {
                                text: 'Technology'
                            }
                        },
                        {
                            'itunes:category': {
                                _attr: {
                                    text: 'Gadgets'
                                }
                            }
                        }
                    ]
                }
            ]
        });

        /* loop over data and add to feed */
        feed.item({
            title: 'item title',
            description: 'use this for the content. It can include html.',
            url: 'http://example.com/article4?this&that', // link to the item
            guid: '1123', // optional - defaults to url
            categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
            author: 'Guest Author', // optional - defaults to feed author property
            date: 'May 27, 2012', // any format that js Date can parse.
            lat: 33.417974, //optional latitude field for GeoRSS
            long: -111.933231, //optional longitude field for GeoRSS
            // enclosure: {url:'...', file:'path-to-file'}, // optional enclosure
            custom_elements: [
                {'itunes:author': 'John Doe'},
                {'itunes:subtitle': 'A short primer on table spices'},
                {
                    'itunes:image': {
                        _attr: {
                            href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
                        }
                    }
                },
                {'itunes:duration': '7:04'}
            ]
        });

        let xml = feed.xml({indent: true});
        ctx.body = xml
    }
}
