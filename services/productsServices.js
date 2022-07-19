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

module.exports = { getAll, getById, registerNewProduct };
