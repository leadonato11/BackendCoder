const express = require("express");
const { controller } = require("../controller/articles");
const { sendToAll } = require("../services/socket");
const router = express.Router();

// GET '/api/productos' -> devuelve todos los productos.

router.get("/", async (request, response) => {
  const articles = await controller.getAll();
  console.log(articles);
  response.json({
    data: articles,
    message: "PETICIÓN GET A LOS PRODUCTOS DISPONIBLES",
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

router.post("/", async (request, response) => {
  const { nombre, precio, thumbnail } = request.body;

  if (!nombre || !precio || !thumbnail) {
    return response.status(400).json({
      msg: "Nombre, precio o miniatura faltante",
    });
  }

  const productPost = {
    nombre,
    precio: Number(precio),
    thumbnail,
  };

  console.log(productPost);

  if (isNaN(precio) && precio >= 0) {
    return response.status(400).json({
      msg: "Precio debe ser valor numérico",
    });
  }

  const newProduct = await controller.save(productPost);

  sendToAll("productCreated", newProduct);

  response.json({
    data: newProduct,
    message: "PETICIÓN POST PARA AGREGAR UN PRODUCTO",
  });
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put("/:id", async (request, response) => {
  const { nombre, precio, thumbnail } = request.body;
  const { id } = request.params;

  const article = await controller.getById(id);

  if (!article) {
    return response.status(404).json({
      msg: "Producto no encontrado",
    });
  }

  if (!nombre || !precio || !thumbnail) {
    return response.status(400).json({
      msg: "Nombre, precio o miniatura faltante",
    });
  }

  const productPost = {
    nombre,
    precio,
    thumbnail,
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

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await controller.deleteById(id);

  response.json({
    message: "PETICIÓN DELETE PARA ELIMINAR UN PRODUCTO",
  });
});

module.exports = router;


router.get('/', getAllProds)

router.get('/:id', getProdById)

router.post('/', saveProd)

router.put('/:id', updateProd)

router.delete('/:id', deleteProd)