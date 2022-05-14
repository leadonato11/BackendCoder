/* 
Importo lo necesario para trabajar con el archivo de rutas de productos. Express, el controller de los productos (asi puedo usar los métodos),
y el router para los endpoints.
*/

const express = require("express");
const { controller } = require("../../controller/articles");
const router = express.Router();
const userAuth = require("../../middleware/authentication");

/* ------------ Aqui comienzo con los endpoints ------------ */
// GET '/api/productos' -> devuelve todos los productos.

router.get("/", async (request, response) => {
  const articles = await controller.getAll();
  console.log(articles);
  response.json({
    data: articles,
  });
});

// GET '/api/productos/:id' -> devuelve un producto según su id.

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const article = await controller.getById(id);

  if (!article) {
    return response.status(404).json({
      msg: "Producto no encontrado",
    });
  }
  response.json({
    data: article,
    message: "PETICIÓN GET PARA UN PRODUCTO POR ID",
  });
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

router.post("/", userAuth, async (request, response) => {
  const { nombre, descripcion, codigo, precio, thumbnail, stock } =
    request.body;

  console.log(nombre, descripcion, codigo, precio, thumbnail, stock);

  if (!nombre || !descripcion || !codigo || !precio || !thumbnail || !stock) {
    return response.status(400).json({
      msg: "Faltan datos requeridos",
    });
  }

  const productPost = {
    nombre,
    descripcion,
    codigo,
    precio,
    thumbnail,
    stock,
  };

  console.log(productPost);

  if (isNaN(precio)) {
    return response.status(400).json({
      msg: "Precio debe ser valor numérico",
    });
  }

  const articles = await controller.save(productPost);

  response.json({
    data: articles,
  });
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put("/:id", userAuth, async (request, response) => {
  const { nombre, descripcion, codigo, precio, thumbnail, stock } =
    request.body;
  const { id } = request.params;

  const article = await controller.getById(id);

  if (!article) {
    return response.status(404).json({
      msg: "Producto no encontrado",
    });
  }

  if (!nombre || !descripcion || !codigo || !precio || !thumbnail || !stock) {
    return response.status(400).json({
      msg: "Faltan datos requeridos",
    });
  }

  const productPost = {
    nombre,
    descripcion,
    codigo,
    precio,
    thumbnail,
    stock,
  };

  if (isNaN(precio)) {
    return response.status(400).json({
      msg: "Precio debe ser valor numérico",
    });
  }

  const articleEdited = await controller.update(id, productPost);

  response.json({
    data: articleEdited,
    message: "PETICIÓN PUT PARA ACTUALIZAR UN PRODUCTO",
  });
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.

router.delete("/:id", userAuth, async (request, response) => {
  const { id } = request.params;
  await controller.deleteById(id);

  response.json({
    message: "PETICIÓN DELETE PARA ELIMINAR UN PRODUCTO",
  });
});

module.exports = router;
