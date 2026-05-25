const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const { validateBookId, validateCreateBook } = require('../middleware/validation');

// #swagger.path = '/books'
router.get('/', booksController.getAllBooks);
// #swagger.path = '/books/{id}'
router.get('/:id', validateBookId, booksController.getSingleBook);
// #swagger.path = '/books'
router.post('/', validateCreateBook, booksController.createBook);
// #swagger.path = '/books/{id}'
router.put('/:id', validateBookId, validateCreateBook, booksController.updateBook);
// #swagger.path = '/books/{id}'
router.delete('/:id', validateBookId, booksController.deleteBook);

module.exports = router;