const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');
const { validateAuthorId, validateCreateAuthor } = require('../middleware/authorValidation');
const { isAuthneticated } = require('../middleware/authenticate');
 // #swagger.tags = ['Authors']
router.get('/', authorsController.getAllAuthors);
 // #swagger.tags = ['Authors']
router.get('/:id', validateAuthorId, authorsController.getSingleAuthor);
 // #swagger.tags = ['Authors']
router.post('/', isAuthneticated, validateCreateAuthor, authorsController.createAuthor);
 // #swagger.tags = ['Authors']
router.put('/:id', isAuthneticated, validateAuthorId, validateCreateAuthor, authorsController.updateAuthor);

 // #swagger.tags = ['Authors']
router.delete('/:id', isAuthneticated, validateAuthorId, authorsController.deleteAuthor);

module.exports = router; 