const httpStatusCode = require('../db/httpStatusCode');
const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  try {
    const products = await productsServices.getAll();
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
    const product = await productsServices.getById(id);
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
      const newProduct = await productsServices.registerNewProduct(name);

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

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const result = await productsServices.updateProduct(id, name);
    if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }
  res.status(200).send(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productsServices.deleteProduct(id);

  if (result.error) {
    return res
      .status(result.error.code)
      .json({ message: result.error.message });
  }
  res.status(204).json(result);
};

module.exports = { getAll, getById, registerNewProduct, updateProduct, deleteProduct };
