const express = require("express");
const { controller } = require("../../controller/chat");
const { sendToAll } = require("../../services/socket");
const router = express.Router();

// GET '/api/chat' -> devuelve todos los mensajes de chat.

router.get("/", async (request, response) => {
  try {
    const chatMessages = await controller.getAll();
    response.json({
      data: chatMessages,
      message: "PETICIÓN GET A LOS PRODUCTOS DISPONIBLES",
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

// POST '/api/chat' -> recibe y agrega un chat, y lo devuelve con su id asignado.

router.post("/", async (request, response) => {
  try {
    const { username, time, message } = request.body;

    if (!username || !time || !message) {
      return response.status(400).json({
        msg: "Some data is missing",
      });
    }

    const chatPost = {
      username,
      time,
      message,
    };

    const newChat = await controller.save(chatPost);

    sendToAll("chatCreated", newChat);

    response.json({
      data: newChat,
      message: "PETICIÓN POST PARA AGREGAR UN CHAT",
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
