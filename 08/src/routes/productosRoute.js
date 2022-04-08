const express = require("express");
// const { myArticlesController } = require("../controller/articles");
const router = express.Router();

router.get('/', (request, response) => {
  response.json({
    message: "PETICIÓN GET A LOS PRODUCTOS DISPONIBLES",
  });
});

router.get("/:id", (request, response) => {
  response.json({
    message: "PETICIÓN GET PARA UN PRODUCTO POR ID",
  });
});

router.post("/", (request, response) => {
  response.json({
    message: "PETICIÓN POST PARA AGREGAR UN PRODUCTO",
  });
});

router.put("/:id", (request, response) => {
  response.json({
    message: "PETICIÓN PUT PARA ACTUALIZAR UN PRODUCTO",
  });
});

router.delete("/:id", (request, response) => {
  response.json({
    message: "PETICIÓN DELETE PARA ELIMINAR UN PRODUCTO",
  });
});

module.exports = router;
