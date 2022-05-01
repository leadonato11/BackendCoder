const express = require("express");
const http = require("http");
const apiRouter = require("./routes/api");
const mainRouter = require("./routes/mainRouter");
const { initWsServer } = require("./services/socket");

const app = express();
const myServer = http.Server(app);

//Init SocketIo Server
initWsServer(myServer);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use("/api", apiRouter);

myServer.listen(8080, () => {
  console.log("Server up on port 8080");
});
