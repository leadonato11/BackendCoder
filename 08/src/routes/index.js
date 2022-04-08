const express = require("express");
const productosRouter = require('./productosRoute')

const router = express.Router();

router.use('/productos', productosRouter)

module.exports = router; // Default export