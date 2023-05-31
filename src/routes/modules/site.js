import express from "express";
const router = express.Router();

import siteController from "../../controllers/SiteController.js";

router.get("/logout", siteController.logout);
router.get("/search/", siteController.search);
router.get("/", siteController.index);

export default router;
