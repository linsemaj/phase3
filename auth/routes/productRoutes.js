const express = require('express')
const product = require('../controllers/ProductController')
const router = express.Router()


router.get("/", product.GetProducts);
router.get("/:id", product.GetProductById);
router.post("/", product.StoreProductInfo);
router.put("/:id", product.UpdateProductInfo);
router.delete("/:id", product.DeleteProductInfo);

module.exports = router;