import express from "express";
import contactController from "../../controllers/ContactController.js";
const router = express.Router();

router.post("/send", contactController.send);
router.get("/", contactController.index);
export default router;
