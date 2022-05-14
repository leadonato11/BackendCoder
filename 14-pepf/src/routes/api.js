const express = require("express");
const productosRouter = require("./api/productosRoute");
const carritoRouter = require("./api/carritoRoute");
const router = express.Router();

/* Aca defino las rutas para los recursos que necesito.
Una para los productos (donde puedo verlos, ver por id, guardar, etc).
Y la otra para los carritos, donde también puedo crearlos,
guardar nuevos, guardar productos en dichos carritos, etc. */

router.use("/productos", productosRouter);
router.use("/carrito", carritoRouter);

module.exports = router; // Default export