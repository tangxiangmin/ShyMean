/**
 * Created by Txm on 2018/4/26.
 * use mongodb to save cache
 */

let MongoClient = require("mongodb");
const url = "mongodb://localhost:27017";
const DB_NAME = "blog";

let Util = {
    createConnect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, client) {
                if (err) {
                    return reject(err)
                }
                resolve(client)
            });
        })
    },
    getArticleCollection() {
        return this.createConnect().then(client => {
            const db = client.db(DB_NAME);
            let col = db.collection('article')
            return {
                col,
                client
            }
        })
    }
}

module.exports = {
    saveArticle(value){
        return Util.getArticleCollection().then(({col, client}) => {
            return new Promise((resolve, reject) => {
                col.insertOne(value, function (err, result) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                    client.close();
                });
            })
        })
    },

    getArticle(query){
        return Util.getArticleCollection().then(({col, client}) => {
            return new Promise((resolve, reject) => {
                col.find(query).next((err, docs) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(docs)
                    client.close();
                })
            })
        })
    }
}

