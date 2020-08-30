const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const controllerProduct = require('../controller/product');

const Product = () => {
    router.post("/api/add_product", upload.single("upload"), controllerProduct.add_product);
    router.get("/api/get_all_product", controllerProduct.getAll_Product);
    router.post("/api/get_product_details", controllerProduct.getAll_Product_By_Id);
    router.post("/api/delete_product", controllerProduct.delete_product_by_id);
    router.post("/api/update_product", upload.single("upload"), controllerProduct.update_product_by_id);
    return router;
}

module.exports = Product;