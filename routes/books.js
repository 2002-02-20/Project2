const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const { validateBookId, validateCreateBook } = require('../middleware/validation');
const { isAuthneticated } = require('../middleware/authenticate');

// #swagger.tags = ['Books']
router.get('/', booksController.getAllBooks);
// #swagger.tags = ['Books']
router.get('/:id', validateBookId, booksController.getSingleBook);
// #swagger.tags = ['Books']
router.post('/', isAuthneticated, validateCreateBook, booksController.createBook);
// #swagger.tags = ['Books']
router.put('/:id', isAuthneticated, validateBookId, validateCreateBook, booksController.updateBook);
// #swagger.tags = ['Books']
router.delete('/:id', isAuthneticated, validateBookId, booksController.deleteBook);

module.exports = router;