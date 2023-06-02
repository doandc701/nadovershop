import express from "express";
import { getPayment, getPaymentCallback, getPaymentReturn, postPayment } from "../../controllers/PaymentController.js";
const router = express.Router();

router.post("/checkout", postPayment);
router.get("/vnpay_return", getPaymentReturn);
router.get("/callback", getPaymentCallback);
router.get("/", getPayment);
export default router;
