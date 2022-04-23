const express = require("express");
const { controller } = require("../controller/articles");

const router = express.Router();

router.get("/", (request, response, next) => {
  response.render("pages/formulario", { pageTitle: "Cargar nuevo producto" });
});

router.get("/productos", async (request, response, next) => {
  const products = await controller.getAll()
  response.render("pages/index", {
    pageTitle: "Listado de productos",
    products
  });
});

router.get("/productos/:id", async (request, response, next) => {
  const {id} = request.params
  const product = await controller.getById(id)
  response.render("pages/index", {
    pageTitle: "Listado de productos",
    products: product ? [product] : []       // Si hay productos, traigo los productos, sino, un array vacío.
  });
});

module.exports = router; // Default export
