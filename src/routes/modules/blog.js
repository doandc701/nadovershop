import express from "express";
const router = express.Router();

import blogController from "../../controllers/BlogController.js";
// newController.index;
router.get("/:slug", blogController.show);
router.get("/", blogController.index);
export default router;
