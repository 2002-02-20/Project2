const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {
    const result = await mongoDb.getDb().db('books').collection('books-collection').find();

    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
}

const getSingleBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);

    const result = await mongoDb.getDb().db('books').collection('books-collection').find({ _id: bookId });
    result.toArray().then((contact) => {
        if (contact.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Book not found"
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
}

const createBook = async (req, res) => {
    if (!req.body.author || !req.body.title || !req.body.description || !req.body.score || !req.body.genre || !req.body.published_date) {
        return res.status(400).json({
            status: 400,
            message: "Missing required fields"
        });
    }

    const book = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        score: req.body.score,
        genre: req.body.genre,
        published_date: req.body.published_date,
        editorial: req.body.editorial || null,
        country: req.body.country || null
    };

    const result = await mongoDb.getDb().db('books').collection('books-collection').insertOne(book);
    if (result.acknowledged) {
        res.status(201).json({
            status: 201,
            "result": result
        });
    } else {
        res.status(500).json({ status: 500, message: result.error || 'An error occurred while creating the book.' });
    }
}

const updateBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const book = {
        author: req.body.author || null,
        title: req.body.title || null,
        description: req.body.description || null,
        score: req.body.score || null,
        genre: req.body.genre || null,
        published_date: req.body.published_date || null,
        editorial: req.body.editorial || null,
        country: req.body.country || null
    };


    const result = await mongoDb.getDb().db('books').collection('books-collection').updateOne({ _id: bookId }, { $set: book });
    if (result.acknowledged > 0) {
        res.status(201).json({
            status: 201,
            "result": result
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Book not found"
        });
    }
}

const deleteBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);

    const result = await mongoDb.getDb().db('books').collection('books-collection').deleteOne({ _id: bookId });
     if (result.deletedCount > 0) {
        res.status(200).json({ status: 200, message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'Book not found' });
    }
}

module.exports =
    { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };