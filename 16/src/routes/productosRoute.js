const express = require("express");
const {
  getAllProds,
  getProdById,
  saveProd,
  updateProd,
  deleteProd,
} = require("../controller/articles");
const router = express.Router();

// Establezco los endpoints
router.get("/", getAllProds);

router.get("/:id", getProdById);

router.post("/", saveProd);

router.put("/:id", updateProd);

router.delete("/:id", deleteProd);

module.exports = router;
