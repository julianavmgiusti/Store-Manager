const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.registerNewProduct);
router.put('/:id', productsController.updateProduct);

module.exports = router;
