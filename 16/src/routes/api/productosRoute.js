const express = require("express");
const { controller } = require("../../controller/articles");
const { sendToAll } = require("../../services/socket");
const router = express.Router();

// GET '/api/productos' -> devuelve todos los productos.

router.get("/", async (request, response) => {
  try {
    const articles = await controller.getAll();
    console.log(articles);
    response.json({
      data: articles,
      message: "PETICIÓN GET A LOS PRODUCTOS DISPONIBLES",
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

// GET '/api/productos/:id' -> devuelve un producto según su id.

router.get("/:id", async (request, response) => {
  try {
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
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

router.post("/", async (request, response) => {
  try {
    const { title, price, thumbnail } = request.body;

    if (!title || !price || !thumbnail) {
      return response.status(400).json({
        msg: "Nombre, precio o miniatura faltante",
      });
    }

    const productPost = {
      title,
      price: Number(price),
      thumbnail,
    };

    console.log(productPost);

    if (isNaN(price) && price >= 0) {
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
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put("/:id", async (request, response) => {
  try {
    const { title, price, thumbnail } = request.body;
    const { id } = request.params;

    const article = await controller.getById(id);

    if (!article) {
      return response.status(404).json({
        msg: "Producto no encontrado",
      });
    }

    if (!title || !price || !thumbnail) {
      return response.status(400).json({
        msg: "Nombre, precio o miniatura faltante",
      });
    }

    const productPost = {
      title,
      price,
      thumbnail,
    };

    if (isNaN(price)) {
      return response.status(400).json({
        msg: "Precio debe ser valor numérico",
      });
    }

    const articleEdited = await controller.update(id, productPost);

    response.json({
      data: articleEdited,
      message: "PETICIÓN PUT PARA ACTUALIZAR UN PRODUCTO",
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await controller.deleteById(id);

    response.json({
      message: "PETICIÓN DELETE PARA ELIMINAR UN PRODUCTO",
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
