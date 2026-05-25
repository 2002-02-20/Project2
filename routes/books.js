const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
//const { idValidationRules, validateId } = require('../validation/validator');

// #swagger.path = '/books'
router.get('/', booksController.getAllBooks);
// #swagger.path = '/books/{id}'
router.get('/:id', booksController.getSingleBook);
// #swagger.path = '/books'
router.post('/', booksController.createBook);
// #swagger.path = '/books/{id}'
router.put('/:id', booksController.updateBook);
// #swagger.path = '/books/{id}'
router.delete('/:id', booksController.deleteBook);

module.exports = router;