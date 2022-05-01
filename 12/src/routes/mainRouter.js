const express = require("express");
const { controller } = require("../controller/articles");

const router = express.Router();

router.get("/", async (request, response, next) => {
  const products = await controller.getAll()
  response.render("pages/formulario", { pageTitle: "Cargar nuevo producto", products});
});

module.exports = router; // Default export
