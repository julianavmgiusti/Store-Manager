const httpStatusCode = require('../db/httpStatusCode');
const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.getById(id);
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

const registerNewProduct = async (req, res) => {
    try {
      const { name } = req.body;
      const newProduct = await productsService.registerNewProduct(name);

      if (!newProduct.name || newProduct.length < 1) {
        return res.status(httpStatusCode.BAD_REQUEST).json({ message: '"name" is required' });
      }
      if (newProduct.name.length < 5) {
        return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
          message: '"name" length must be at least 5 characters long',
        });
      }
      return res.status(httpStatusCode.CREATED).json(newProduct);
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER).send(err);
    }
};

module.exports = { getAll, getById, registerNewProduct };
