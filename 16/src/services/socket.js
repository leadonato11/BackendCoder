const socketIo = require("socket.io");
const { getAllProds } = require("../controller/articles");

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("Nueva Conexion establecida!", socket.id);

    // Socket para cargar los productos de la base de datos mariaDB desde el backend
    socket.on("loadProducts", async () => {
      const articles = await getAllProds();
      socket.emit("productsLoaded", articles);
    });

    // Socket para cargar el chat de la base de datos sqlite3 desde el backend
    // socket.on("loadChat", async () => {
    //   const messages = await chatController.getAll();
    //   socket.emit("chatLoaded", messages);
    // });

    // Socket para enviar mensajes de chat a todos y guardar los mismos en la DB Sqlite3 desde el backend
    // socket.on("sendMessage", async (obj) => {
    //   const newMessage = await chatController.save(obj);
    //   sendToAll("newMessage", newMessage);
    // });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

const sendToAll = (eventName, data) => {
  io.emit(eventName, data);
};

module.exports = {
  initWsServer,
  getWsServer,
  sendToAll,
};
