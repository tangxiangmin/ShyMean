/**
 * 2019/4/27 下午5:56
 */

import mysql from '../core/mysql'

import Tag from './tag'
import {create} from "domain";

export default {
    async count() {
        let conn = await mysql.getConnection()
        let [rows] = await conn.query(`select COUNT(*) as total from article`)
        return rows[0]
    },
    async formatArticle(articles: any[]) {
        const {TYPE_TAG, TYPE_CATEGORY} = Tag;
        let conn = await mysql.getConnection()
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

        let [list] = await conn.query(`SELECT id, title, created_at,abstract from article ORDER BY created_at DESC LIMIT ? OFFSET ?`, [size, page * size])

        if(Array.isArray(list) && list.length){
            return this.formatArticle(list)
        }else {
            return []
        }
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

        let [list] = await conn.query(`select a.id, a.title, a.created_at, Year(a.created_at) as year from article as a join tag as t on t.name = ? join article_tag as a_t on a.id = a_t.article_id where t.id = a_t.tag_id order by created_at DESC`, [tagname])
        return list
    },
    // 文章详情
    async getArticleByTitle(title: string) {
        let conn = await mysql.getConnection()
        let [articles] = await conn.query(`select a.id, a.title, a.abstract, a.created_at, a.content from article as a where a.title = ?`, [title])
        if(Array.isArray(articles) && articles.length){
            articles = await this.formatArticle(articles)
            return articles[0]
        }
        return null
    },
    async getPrevArticle(created_at: string) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`SELECT title FROM article WHERE created_at > ? ORDER BY created_at LIMIT 1 `, [created_at])
        return res && res[0]
    },
    async getNextArticle(created_at: string) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`SELECT title FROM article WHERE created_at < ? ORDER BY created_at DESC LIMIT 1  `, [created_at])
        return res && res[0]
    },
    async addArticle(
        content: string,
        title: string,
        created_at: number,
        abstract: string,
    ) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`INSERT INTO article (content,title, created_at, abstract) VALUES (?,?,?,?)`, [content, title, created_at, abstract])
        return res && res.insertId
    },
    async removeArticleById(articleId: number) {
        let conn = await mysql.getConnection()
        await conn.query(`DELETE FROM article WHERE id = ?`, [articleId])
        await conn.query(`DELETE FROM article_tag WHERE article_id = ?`, [articleId])
    }
}
