import express from "express";
const router = express.Router();

const UploadController = require("../../app/controllers/UploadController");
// newController.index;
router.get("/:slug", UploadController.show);
router.get("/", UploadController.index);

export default router;
