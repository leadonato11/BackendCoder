const express = require("express");
const productosRouter = require('./api/productosRoute')
const chatRouter = require('./api/chatRoute')

const router = express.Router();

router.use('/productos', productosRouter)
router.use('/chat', chatRouter)

module.exports = router; // Default export