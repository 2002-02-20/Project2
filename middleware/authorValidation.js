const ObjectId = require('mongodb').ObjectId;

const validateAuthorId = (req, res, next) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status:400,
            message:'Invalid author id'
        });
    }

    next();
}

const validateCreateAuthor = (req, res, next) => {
    try {
        if (!req.body.name || !req.body.nationality || !req.body.birth_date || req.body.active === undefined || !req.body.language) {
           return res.status(400).json({
                status: 400,
                message: "The request cannot be processed because of bad request syntax"
            });
        }
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateAuthorId,
    validateCreateAuthor
};