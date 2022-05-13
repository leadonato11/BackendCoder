/* 
Importo lo necesario para trabajar con el archivo de rutas de carrito. Express, el controller de los carritos (asi puedo usar los métodos),
y el router para los endpoints.
*/

const express = require("express");
const { controller } = require("../controller/cart");
const router = express.Router();

/* ------------ Aqui comienzo con los endpoints ------------ */
// GET '/api/carrito' -> devuelve todos los carritos.

router.get("/", async (request, response) => {
  const carritos = await controller.getAll();
  console.log(carritos);

  response.json({
    data: carritos,
  });
});

// GET '/api/carrito/:id/productos' -> devuelve los productos de un carrito según el id.

router.get("/:id/productos", async (request, response) => {
  const idCarrito = request.params.id; // Obtengo el id del carrito
  const carrito = await controller.getById(idCarrito); // Busco el carrito según el id
  const productos = carrito.productos; // Guardo los productos de ese carrito en productos

  response.json({
    data: productos,
  });
});

// POST '/' -> Crea un carrito y lo devuelve con sus datos.

router.post("/", async (request, response) => {
  const carrito = await controller.saveCart();

  response.json({
    msg: "Carrito creado",
    data: carrito,
  });
});

// POST '/api/:id/productos' -> recibe un id de carrito y agrega un producto en el, y devuelve el carrito con el producto incluido.

router.post("/:id/productos", async (request, response) => {
  const idCarrito = request.params.id; // Obtengo el id del carrito de los params
  const idProductAdd = request.body.id; // Obtengo el id del producto pasado por body

  await controller.saveProduct(idCarrito, idProductAdd); // Le clavo el producto al carrito. Tremendo esto.
  const carritoConProducto = await controller.getById(idCarrito);

  response.json({
    msg: "Se agregó el producto al carrito",
    data: carritoConProducto,
  });
});

// DELETE '/api/carrito/:id/productos/:id_prod' -> elimina un producto del carrito según su id.

router.delete("/:id/productos/:id_prod", async (request, response) => {
  const idCarrito = request.params.id;
  const idProd = request.params.id_prod;

  await controller.deleteProductById(idCarrito, idProd);
  const carrito = await controller.getById(idCarrito);

  response.json({
    msg: "El producto se ha borrado del carrito",
    data: carrito,
  });
});

// DELETE '/api/carrito/:id' -> elimina un carrito según su id.

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await controller.deleteById(id);

  response.json({
    message: "PETICIÓN DELETE PARA ELIMINAR UN PRODUCTO",
  });
});

module.exports = router;
