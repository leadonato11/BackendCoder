const express = require("express");
const { controller } = require("../controller/articles");
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
  console.log(request.body)
  console.log(request)
  const { nombre, precio, thumbnail } = request.body;

  console.log(nombre, precio, thumbnail);

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

  console.log(productPost);

  if (isNaN(precio)) {
    return response.status(400).json({
      msg: "Precio debe ser valor numérico",
    });
  }

  const articles = await controller.save(productPost);

  response.json({
    data: articles,
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
