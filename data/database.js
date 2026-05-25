const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
let db;
const initDb = async (callback) => {
    if (db) {
        console.warn('Trying to init DB again!');
        return callback(null, db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            db = client;
            callback(null, db);
        })
        .catch((err) => {
            callback(err);
        });
};
const getDb = () => {
    if (!db) {
        throw Error('Database not initialized');
    }
    return db;
};

module.exports = {
    initDb,
    getDb
};