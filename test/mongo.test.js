let MongoClient = require("mongodb");
let assert = require("assert");

let url = "mongodb://localhost:27017";

const DB_NAME = "shymean";

let insertDocuments = function(db, callback) {
    // Get the documents collection
    let collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

let findDocuments = function(db, callback) {
    // Get the documents collection
    let collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}


MongoClient.connect(url, function(err, client) {
    console.log("Connected correctly to server");
    const db = client.db(DB_NAME);

    insertDocuments(db, function() {
        client.close();
    });
});