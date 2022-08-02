const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getSales);
router.post('/', salesController.addSaleProduct);
router.get('/:id', salesController.getSaleById);
module.exports = router;
