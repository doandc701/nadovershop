import express from "express";
const router = express.Router();

import newController from "../../app/controllers/NewController.js";
// newController.index;
router.get("/:slug", newController.show);
router.get("/", newController.index);
export default router;
