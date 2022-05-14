// Importo librerías y archivos
const express = require("express");
const http = require("http");
const mainRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const denv = require('dotenv');
denv.config();
const PORT = process.env.PORT || 8080;

// Armo mi servidor express
const app = express();
const myServer = http.Server(app);

// Los set son para establecer la ubicacion de las vistas e indico que motor voy a utilizar en esas vistas, en este caso, ejs.
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public")); // Establezco la ubicación de los archivos estáticos

app.use(express.json()); // Permite leer json de la data recibida
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter); // Establezco la ruta principa "localhost:8080/"
app.use("/api", apiRouter); // Establezco la ruta hacia los endpoints "localhost:8080/api"
app.use('/myApp/leadonato', apiRouter)

// Establezco ruta por defecto si no es una ruta correcta. Error 404.
app.use((request, response) => {
  response.status(404).json({
    msg: "Page not found",
  });
});

// Levanto mi servidor de express
myServer.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});

// Si hay error en el inicio del server, te lo largo acá
myServer.on("error", (err) => {
  console.log("Wtf... An error ocurrs!", err);
});
