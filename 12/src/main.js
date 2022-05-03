// Importo librerías y archivos
const express = require("express");
const http = require("http");
const apiRouter = require("./routes/api");
const mainRouter = require("./routes/mainRouter");
const { initWsServer } = require("./services/socket");

// Armo mi servidor express
const app = express();
const myServer = http.Server(app);

//Init SocketIo Server
initWsServer(myServer);

// Los set son para establecer la ubicacion de las vistas y que motor voy a utilizar en esas vistas, en este caso, ejs.
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public")); // Establezco la ubicación de los archivos estáticos
app.use(express.json()); // Permite leer json de la data recibida
app.use(express.urlencoded({ extended: true })); 
app.use("/", mainRouter); // Establezco la ruta principal
app.use("/api", apiRouter); // Establezco la ruta hacia los endpoints

// Levanto mi servidor de express
myServer.listen(8080, () => {
  console.log("Server up on port 8080");
});
