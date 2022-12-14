const connection = require('../db/connection');

const addSale = async () => {
  const [row] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  return row.insertId;
};

const addSaleProduct = async (id, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_Id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );

  return {
    id,
    productId,
    quantity,
  };
};

const getSales = async () => {
  const [rows] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      ORDER BY sale_id ASC, product_id ASC`,
  );
  return rows;
};

const getSaleById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT date, product_id AS productId , quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id`, [id],
  );
  return rows;
};

const deleteSale = async (id) => {
  const searchId = await getSaleById(id);

  if (searchId.length === 0) return [];

  const [row] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return row;
};

const updateSales = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  return saleId;
};

module.exports = {
  addSale,
  addSaleProduct,
  getSales,
  getSaleById,
  deleteSale,
  updateSales,
};
