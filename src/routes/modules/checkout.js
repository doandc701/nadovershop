import express from "express";
import checkOutController from "../../app/controllers/CheckOutController.js";
const router = express.Router();

router.post("/order-cart",checkOutController.orderCart)
router.get("/:id", checkOutController.show);
router.get("/", checkOutController.index);
export default router;
