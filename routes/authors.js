const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');
const { validateAuthorId, validateCreateAuthor } = require('../middleware/authorValidation');

 // #swagger.tags = ['Authors']
router.get('/', authorsController.getAllAuthors);
 // #swagger.tags = ['Authors']
router.get('/:id', validateAuthorId, authorsController.getSingleAuthor);
 // #swagger.tags = ['Authors']
router.post('/', validateCreateAuthor, authorsController.createAuthor);
 // #swagger.tags = ['Authors']
router.put('/:id', validateAuthorId, validateCreateAuthor, authorsController.updateAuthor);

 // #swagger.tags = ['Authors']
router.delete('/:id', validateAuthorId, authorsController.deleteAuthor);

module.exports = router; 