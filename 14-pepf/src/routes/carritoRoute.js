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
    message: "PETICIÓN GET A LOS CARRITOS DISPONIBLES",
  });
});

// GET '/api/carrito/:id' -> devuelve un carrito según su id con los productos que tenga.

router.get("/:id/productos", async (request, response) => {
  const { idCarrito } = request.params; // Obtengo el id del carrito
  const carrito = await controller.getById(idCarrito);
  const productos = carrito.productos;
  
  try {
    res.json({ productos });
  } catch (error) {
    response.json({ msg: "NO SE PUDO ACCEDER AL CARRITO" });
  }
});

// POST '/' -> Crea un carrito y lo devuelve con su id asignado.

router.post('/', async (req, res) => {
  const carrito = await CartController.createCart()

  try {
      res.json(carrito.id)
  }
  catch (error) {
  res.json({msg: "NO SE PUDO CREAR CARRITO"})
  }
})

// POST '/api/:id/productos' -> recibe y agrega un producto en el carrito, y lo devuelve con su id asignado.

router.post("/:id/productos", async (request, response) => {
  const { idCarrito } = request.body; // Obtengo el id del carrito
  const { idProductAdd } = request.params

  await controller.saveProduct(idCarrito, idProductAdd);

  try {
    response.json({ msg: "PRODUCTO AGREGADO" });
  } catch (error) {
    response.json({ msg: "NO SE PUDO AGREGAR EL PRODUCTO" });
  }
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
