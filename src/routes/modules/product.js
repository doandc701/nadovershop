import express from "express";
const router = express.Router();

import productController from "../../controllers/ProductControllers.js";
// newController.index;
router.get("/:slug", productController.show);
export default router;
