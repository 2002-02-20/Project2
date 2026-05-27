const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const { validateBookId, validateCreateBook } = require('../middleware/validation');

// #swagger.tags = ['Books']
router.get('/', booksController.getAllBooks);
// #swagger.tags = ['Books']
router.get('/:id', validateBookId, booksController.getSingleBook);
// #swagger.tags = ['Books']
router.post('/', validateCreateBook, booksController.createBook);
// #swagger.tags = ['Books']
router.put('/:id', validateBookId, validateCreateBook, booksController.updateBook);
// #swagger.tags = ['Books']
router.delete('/:id', validateBookId, booksController.deleteBook);

module.exports = router;