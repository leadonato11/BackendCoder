const express = require("express");
const productosRouter = require('./productosRoute')

const router = express.Router();

router.use('/', productosRouter)

module.exports = router; // Default export