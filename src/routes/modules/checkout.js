import express from "express";
import checkOutController from "../../controllers/CheckOutController.js";
const router = express.Router();

router.post("/order-cart", checkOutController.orderCart);
router.get("/", checkOutController.index);
export default router;
