/* Importo como siempre lo necesario antes de comenzar, en este caso, express. */
const express = require("express");

// Guardo la app de rutas de express en una constante para utilizarla luego.
const router = express.Router();

// Esta ruta, va a llamar al archivo index ubicado en la raiz de la carpeta de views, mostrará la página principal.
router.get("/", async (request, response, next) => {
  response.render("index", {
    pageTitle: "Primera Entrega proyecto final - Backend CoderHouse",
  });
});

module.exports = router; // Default export
