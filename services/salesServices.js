const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateSales = (newSales, productsList) => {
  if (newSales.some((e) => e.quantity <= 0)) {
    return { error: { code: 422,
      message: '"quantity" must be greater than or equal to 1',
      },
    };
  }
  if (newSales.some((e) => !e.productId)) {
    return { error: { code: 400, message: '"productId" is required' } };
  }
  if (newSales.some((e) => !e.quantity)) {
    return { error: { code: 400, message: '"quantity" is required' } };
  }
  if (!newSales.every((e) => productsList.some((p) => e.productId === p.id))) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  return false;
};

const addSaleProduct = async (newSales) => {
  const productsList = await productsModel.getAll();

  const validate = validateSales(newSales, productsList);
  if (validate) {
    return validate;
  }

  const id = await salesModel.addSale();

  await Promise.all(
    newSales.map((sale) =>
      salesModel.addSaleProduct(id, sale.productId, sale.quantity)),
  );
  return {
    id,
    itemsSold: newSales,
  };
};

const getSales = async () => {
  const results = await salesModel.getSales();

  if (!results) return [];

  return results;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result) return [];

  return result;
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);
  if (result.length === 0) {
    return { error: { code: 404, message: 'Sale not found' } };
  } return result;
};

const updateSales = async (id, newSales) => {
  const productsList = await productsModel.getAll();
  const verifyValidation = validateSales(newSales, productsList);

  if (verifyValidation) {
    return verifyValidation;
  }

  const verifyId = await salesModel.getSaleById(id);
  if (verifyId.length === 0) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  await Promise.all(newSales.map((sale) => salesModel
    .updateSales(id, sale.productId, sale.quantity)));
  return {
    saleId: id,
    itemsUpdated: newSales,
  };
};

module.exports = {
  addSaleProduct,
  getSales,
  getSaleById,
  updateSales,
  deleteSale,
};
