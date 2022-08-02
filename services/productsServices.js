const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products) return [];
  return products;
};

const getById = async (id) => {
  const [product] = await productsModel.getById(id);
  if (!product) return [];
  return product;
};

const registerNewProduct = async (name) => {
  if (!name) return false;
  const newProduct = await productsModel.registerNewProduct(name);
  return newProduct;
};

const updateProduct = async (id, name) => {
  if (!name) return { error: { code: 400, message: '"name" is required' } };

  if (name.length < 5) {
    return {
      error: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const result = await productsModel.updateProduct(id, name);
  if (result.length === 0) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  return result;
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);
  if (result.length === 0) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  return result;
};

const searchByName = async (name) => {
  const result = await productsModel.searchByName(name);

  if (!result) return [];

  return result;
};

module.exports = {
  getAll,
  getById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  searchByName,
};
