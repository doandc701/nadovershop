import express from "express";
import AdminController from "../controller/AdminController.js";
import PagesController from "../controller/PagesController.js";
import CategoriesController from "../controller/CategoriesController.js";
import ProductsController from "../controller/ProductsController.js";
import BlogController from "../controller/BlogController.js";
import CheckOutController from "../controller/CheckOutController.js";
import verifyToken from "../../middlewares/verifyToken.js";
import { getRoles, postRoles } from "../controller/RolesController.js";
import authPage from "../../middlewares/basicAuth.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import uploads from "../../middlewares/uploadFile.js";
const router = express.Router();

router.all("/admin", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});
router.route("/dashboard").get(checkAuth, (req, res, next) => {
  res.render("admin/index", {
    layout: "admin.hbs",
  });
});
// page
router.route("/tables").get(checkAuth, PagesController.index);
router.route("/tables/order-cart").get(checkAuth, CheckOutController.index);
router
  .route("/tables/order-cart/export")
  .get(checkAuth, CheckOutController.export);

router.route("/tables/blog").get(checkAuth, BlogController.index);

// start products
// method products
router
  .route("/tables/products/create")
  .get(checkAuth, ProductsController.create);
router
  .route("/tables/products/store")
  .post(checkAuth, uploads.single("images"), ProductsController.store);
router
  .route("/tables/products/:id/edit")
  .get(checkAuth, ProductsController.edit);
router
  .route("/tables/products/:id")
  .put(checkAuth, uploads.single("images"), ProductsController.update);
router
  .route("/tables/products/:id")
  .delete(checkAuth, ProductsController.delete);
router.route("/tables/products").get(checkAuth, ProductsController.index);
// end products

// start categories
// categories
router.route("/tables/categories").get(checkAuth, CategoriesController.index);
router
  .route("/tables/categories/create")
  .get(checkAuth, CategoriesController.create);
router
  .route("/tables/categories/store")
  .post(checkAuth, CategoriesController.store);
router
  .route("/tables/categories/:id/edit")
  .get(checkAuth, CategoriesController.edit);
router
  .route("/tables/categories/:id")
  .put(checkAuth, CategoriesController.update);
router
  .route("/tables/categories/:id")
  .delete(checkAuth, CategoriesController.delete);

// end categories

// admin
router.route("/sign-up").get(AdminController.signUp, verifyToken);
router.route("/sign-up/register").post(AdminController.register);
router.route("/sign-in").get(AdminController.signIn);
router
  .route("/sign-in/login")
  .post(
    authPage(["64572ed39cbb5f4c80113c6a", "64572f69f6e8de25d650d421"]),
    AdminController.login
  );
router.route("/logout").get(AdminController.logOut);
router.route("/").get(AdminController.index);

// roles
router.route("/role").get(getRoles);
router.route("/role").post(postRoles);
export default router;
