/**
 * 2019/4/27 下午5:56
 */

import mysql from '../core/mysql'

import Tag from './tag'

export default {
    async count() {
        let conn = await mysql.getConnection()
        let [rows] = await conn.query(`select COUNT(*) as total from article`)
        return rows[0]
    },
    async formatArticle(articles: any[]) {
        const {TYPE_TAG, TYPE_CATEGORY} = Tag;
        let conn = mysql.getConnection()
        for (let article of articles) {
            let articleId = article.id;

            article.tags = [];
            article.categories = [];
            let [data] = await conn.query(`SELECT t.name, t.type FROM article_tag AS a_t JOIN tag AS t ON t.id = a_t.tag_id WHERE a_t.article_id = ?`, [articleId])

            if (Array.isArray(data)) {
                data.forEach(tag => {
                    let {type, name} = tag;
                    if (type === TYPE_TAG) {
                        article.tags.push(name);
                    } else if (type === TYPE_CATEGORY) {
                        article.categories.push(name);
                    }
                })
            }
        }
        return articles
    },
    // 首页文章列表
    async getArticles(size: number, page: number) {
        let conn = await mysql.getConnection()

        let [list] = await conn.query(`SELECT id, title, created_at,abstract from article ORDER BY created_at DESC LIMIT ? OFFSET ?`, [size, (page+1)*size])

        return this.formatArticle(list)
    },
    // 归档
    async getArchiveList() {
        let conn = await mysql.getConnection()
        let [list] = await conn.query(`SELECT id, title, created_at, Year(created_at) AS year FROM article WHERE status = 1 ORDER BY created_at DESC`)
        return list
    },
    // 标签筛选文章列表
    async getArticleByTag(tagname: string) {
        let conn = await mysql.getConnection()

        let [list] = await conn.query(`select a.id, a.title, a.created_at, Year(a.created_at) as year from article as a join tag as t on t.name = ? join article_tag as a_t on a.id = a_t.article_id where t.id = a_t.tag_id order by created_at`, [tagname])
        return list
    },
    // 文章详情
    async getArticleByTitle(title: string) {
        let conn = await mysql.getConnection()
        let [articles] = await conn.query(`select a.id, a.title, a.abstract, a.created_at, a.content from article as a where a.title = ?`, [title])

        articles = await this.formatArticle(articles)

        return articles[0]
    },
    async getPrevArticle(created_at: string) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`select title from article where created_at > ? limit 1`, [created_at])
        return res && res[0]
    },
    async getNextArticle(created_at: string) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`select title from article where created_at < ? limit 1`, [created_at])
        return res && res[0]
    }

}
