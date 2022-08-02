const connection = require('../db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const registerNewProduct = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

const updateProduct = async (id, name) => {
  const idSearch = await getById(id);

  if (idSearch.length === 0) return [];

  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  const res = {
    id,
    name,
  };
  return res;
};

const deleteProduct = async (id) => {
  const searchId = await getById(id);

  if (searchId.length === 0) return [];

  const [row] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id]
  );
  return row;
};


module.exports = { getAll, getById, registerNewProduct, updateProduct, deleteProduct };
