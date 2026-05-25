const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res, next) => {
    try {
        //throw new Error('Test error');
        const books = await mongoDb.getDb().db('books').collection('books-collection').find().toArray();
        res.status(200).json(books);

    } catch (error) {
        next(error);
    }

}

const getSingleBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = await mongoDb.getDb().db('books').collection('books-collection').findOne({ _id: bookId });
        if (!book) {
            return res.status(404).json({
                status: 404,
                message: "The resource could not be found at this time. It is possible it was deleted, or does not exist yet."
            });
        }
        res.status(200).json(book);
    }

    catch (error) {
        next(error);
    }
}

const createBook = async (req, res, next) => {
    try {
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
                content: result,
                message: "This data created successfully."
            });
        } else {
            res.status(500).json({
                status: 500,
                message: 'An error occurred while creating the book.',
                error: result.error
            });
        }

    } catch (error) {
        next(error);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const findBook = await mongoDb.getDb().db('books').collection('books-collection').findOne({ _id: bookId });
        if (!findBook) {
            return res.status(404).json({
                status: 404,
                message: "The resource could not be found at this time. It is possible it was deleted, or does not exist yet."
            });
        }
        const updatedBook = req.body;
        const hasChanges = Object.keys(updatedBook).some(key => updatedBook[key] !== findBook[key]);

        if (!hasChanges) {
            return res.status(400).json({
                status: 400,
                message: 'You must provide at least one field to update the book.'
            });
        }
        const book = {
            author: req.body.author || findBook.author,
            title: req.body.title || findBook.title,
            description: req.body.description || findBook.description,
            score: req.body.score || findBook.score,
            genre: req.body.genre || findBook.genre,
            published_date: req.body.published_date || findBook.published_date,
            editorial: req.body.editorial || findBook.editorial,
            country: req.body.country || findBook.country
        };

        const bookResult = await mongoDb.getDb().db('books').collection('books-collection').updateOne({ _id: bookId }, { $set: book });
        if (bookResult.acknowledged) {
            res.status(201).json({
                status: 201,
                result: book,
                message: "Information of book updated successfully."
            });

        }


    } catch (error) {
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongoDb.getDb().db('books').collection('books-collection').deleteOne({ _id: bookId });
        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ status: 404, message: 'Book not found' });
        }

    } catch (error) {
        next(error);
    }
}

module.exports =
    { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };