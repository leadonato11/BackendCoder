const express = require("express");

const router = express.Router();

router.get("/", (request, response, next) => {
  response.render("pages/formulario", { pageTitle: "Crear producto" });
});

router.get("/productos", (request, response, next) => {
  response.render("pages/index", {
    pageTitle: "Listado de productos",
  });
});

module.exports = router; // Default export
