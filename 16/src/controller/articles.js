const { DBService } = require("../services/db");

const tableName = "products";

// Todas las funciones se arrancan ya exportándolas.
// Método getAll para obtener todos los productos de la DB.
const getAllProds = async (request, response) => {
  const products = await DBService.get(tableName);

  response.json({
    data: products,
  });
};

// Método getProdById para obtener un producto según el id desde la DB.
const getProdById = async (request, response) => {
  const { id } = request.params;

  const item = await DBService.get(tableName, id);

  if (!item.length)
    return response.status(404).json({
      msgs: "Product not found!",
    });

  response.json({
    data: item,
  });
};

// Método saveProd para guardar un producto en la tabla products de la DB.
const saveProd = async (request, response) => {
  const { title, thumbnail, price } = request.body;

  const data = {
    title,
    thumbnail,
    price,
  };

  const newId = await DBService.create(tableName, data);

  const newProduct = await DBService.get(tableName, newId);

  response.json({
    data: newProduct,
  });
};

// Método updateProd para actualizar un producto según el id en la tabla products de la DB.
const updateProd = async (request, response) => {
  const { id } = request.params;
  const { title, thumbnail, price } = request.body;

  let item = await DBService.get(tableName, id);

  if (!item.length)
    return response.status(404).json({
      msgs: "Product not found!",
    });

  const data = {
    title,
    thumbnail,
    price,
  };

  DBService.update(tableName, id, data);

  item = await DBService.get(tableName, id);
  response.json({
    msg: "Product updated",
    item,
  });
};

// Método updateProd para borrar un producto según el id de la tabla products de la DB.
const deleteProd = async (request, response) => {
  const { id } = request.params;

  DBService.delete(tableName, id);
  response.json({
    msg: "product deleted",
  });
};

module.exports = {
  getAllProds,
  getProdById,
  saveProd,
  updateProd,
  deleteProd,
};
