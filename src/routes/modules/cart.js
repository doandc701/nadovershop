import express from "express";
import cartController from "../../app/controllers/CartController.js";
const router = express.Router();

router.get("/:id", cartController.index);
export default router;
