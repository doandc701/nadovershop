import express from "express";
const router = express.Router();

import siteController from "../../app/controllers/SiteController.js";
// newController.index;
// router.get("/admin", siteController.admin);
router.get("/search", siteController.search);
router.get("/", siteController.index);

export default router;
