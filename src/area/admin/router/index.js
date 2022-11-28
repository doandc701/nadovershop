import express from "express";
import AdminController from "../controller/AdminController.js";
import PagesController from "../controller/PagesController.js";
import CategoriesController from "../controller/CategoriesController.js";
import ProductsController from "../controller/ProductsController.js";
const router = express.Router();

router.all("/admin", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});
// page
router.route("/tables").get(PagesController.index);
// categories
router.route("/tables/categories").get(CategoriesController.index);
// start products
// method products
router.route("/tables/products/create").get(ProductsController.create);
router.route("/tables/products/store").post(ProductsController.store);
router.route("/tables/products/:id/edit").get(ProductsController.edit);
router.route("/tables/products/:id").put(ProductsController.update);
router.route("/tables/products").get(ProductsController.index);
// end products

// admin
router.route("/").get(AdminController.index);
export default router;
