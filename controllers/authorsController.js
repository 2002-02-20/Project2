const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res, next) => {
    try {
        //throw new Error('Test error');
        const authors = await mongoDb.getDb().db('books').collection('authors-collection').find().toArray();
        res.status(200).json(authors);

    } catch (error) {
        next(error);
    }

}
const getSingleAuthor = async (req, res, next) => {
    try {
        const authorId = new ObjectId(req.params.id);
        const author = await mongoDb.getDb().db('books').collection('authors-collection').findOne({ _id: authorId });
        if (!author) {
            return res.status(404).json({
                status: 404,
                message: "The resource could not be found at this time. It is possible it was deleted, or does not exist yet."
            });
        }
        res.status(200).json(author);
    }

    catch (error) {
        next(error);
    }
}
const createAuthor = async (req, res, next) => {
    try {
        const author = {
            name: req.body.name,
            nationality: req.body.nationality,
            birth_date: req.body.birth_date,
            biography: req.body.biography || null,
            death_date: req.body.death_date || null,
            active: req.body.active,
            language: req.body.language

        };
        const newAuthor = await mongoDb.getDb().db('books').collection('authors-collection').insertOne(author);

        if (newAuthor.acknowledged) {
            res.status(201).json({
                status: 201,
                content: newAuthor,
                message: "This data created successfully."
            });
        } else {
            res.status(500).json({
                status: 500,
                message: 'An error occurred while creating the author.',
                error: newAuthor.error
            });
        }

    } catch (error) {
        next(error);
    }
}
const updateAuthor = async (req, res, next) => {
    // Implementation for updating an author
    try {
        const authorId = new ObjectId(req.params.id);
        const findAuthor = await mongoDb.getDb().db('books').collection('authors-collection').findOne({ _id: authorId });
        if (!findAuthor) {
            return res.status(404).json({
                status: 404,
                message: "The resource could not be found at this time. It is possible it was deleted, or does not exist yet."
            });
        }
        const updateAuthor = req.body;
        const hasChanges = Object.keys(updateAuthor).some(key => updateAuthor[key] !== findAuthor[key]);

        if (!hasChanges) {
            return res.status(400).json({
                status: 400,
                message: "You must provide at least one different field to update the author."
            });
        }
        const author = {
            name: req.body.name,
            nationality: req.body.nationality,
            birth_date: req.body.birth_date,
            biography: req.body.biography || null,
            death_date: req.body.death_date || null,
            active: req.body.active,
            language: req.body.language

        };
        const updateAuthorInsert = await mongoDb.getDb().db('books').collection('authors-collection').updateOne({ _id: authorId }, { $set: author });


        if (updateAuthorInsert.acknowledged) {
            res.status(201).json({
                status: 201,
                content: updateAuthorInsert,
                message: "This data updated successfully."
            });
        } else {
            res.status(500).json({
                status: 500,
                message: 'An error occurred while updating the author.',
                error: updateAuthorInsert.error
            });
        }
    } catch (error) {
        next(error);
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const authorId = new ObjectId(req.params.id);
        const deleteAuthor = await mongoDb.getDb().db('books').collection('authors-collection').deleteOne({ _id: authorId });

        if (deleteAuthor.deletedCount > 0) {
            res.status(200).json({
                status: 200,
                message: "The author was deleted successfully."
            });
        }else{
            res.status(404).json({
                status: 404,
                message: "The author could not be found."
            });
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}