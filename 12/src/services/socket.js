const socketIo = require("socket.io");
const { controller } = require("../controller/articles");

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on("connection", async (socket) => {
    console.log("Nueva Conexion establecida!", socket.id);
    const articles = await controller.getAll();
    socket.emit('loadProducts', articles)
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};
