const productService = require('../services/productServices');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    if (!products) {
      return res
        .status(404)
        .json({ message: 'Product not found' });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    if (!product || product.length < 1) {
      return res
        .status(404)
        .json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAll, getById };
