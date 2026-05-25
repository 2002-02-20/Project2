const ObjectId = require('mongodb').ObjectId;

const validateBookId = (req, res, next) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status:400,
            message:'Invalid book id'
        });
    }

    next();
}
const validateCreateBook = (req, res, next) => {
    const { author, title, description, score, genre, published_date } = req.body;

    if (!author || !title || !description || !score || !genre || !published_date) {
        return res.status(400).json({
            status: 400,
            message: "The request cannot be processed because of bad request syntax"
        });
    }
    next();
};



module.exports = {
    validateBookId,
    validateCreateBook
};