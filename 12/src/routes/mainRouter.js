const express = require("express");
const { controller } = require("../controller/articles");

const router = express.Router();

router.get("/", async (request, response, next) => {
  response.render("pages/formulario", {
    pageTitle: "Cargar nuevo producto",
  });
});

module.exports = router; // Default export
