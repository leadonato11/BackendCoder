const express = require("express");

const router = express.Router();

router.get("/", async (request, response, next) => {
  response.render("index", {
    pageTitle: "Websockets clase 12",
  });
});

module.exports = router; // Default export
