//ENTREGABLE 06 - Servidores web

const { Contenedor } = require("../04-OK/Entregable04");
const express = require("express");

const app = express();
const puerto = 8080; // Declaro el puerto 8080

const server = app.listen(puerto, () => {
  // Utilizo el puerto 8080
  console.log("Server up on port", puerto);
});

server.on("error", (err) => {
  console.log("Error catched", err);
});

app.get("/articles", async (req, res) => {
  const result = await Contenedor.getAll();

  res.json({
    data: result,
  });
});

app.get("/articlesRandom", async (req, res) => {
  const result = await Contenedor.getAll();

  const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }
  
  const productInfo = result.map((product) => product.id);
  console.log(productInfo);

  const randomProduct = between(0, productInfo.length);
  console.log("RANDOM PRODUCT", randomProduct);

  const idRandomProduct = productInfo[randomProduct];
  console.log("ID RANDOM PRODUCT", idRandomProduct);

  res.json({
    data: result[idRandomProduct]
  });
});