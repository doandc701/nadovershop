import express from "express";
import shopController from "../../app/controllers/ShopController.js";
const router = express.Router();

router.get("/search", shopController.search);
router.get("/:slug", shopController.show);
router.get("/", shopController.index);

export default router;
