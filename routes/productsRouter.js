const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();
router.get('/search', productsController.searchByName);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.registerNewProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
