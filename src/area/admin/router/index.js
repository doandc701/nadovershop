import express from "express";
import AdminController from "../controller/AdminController.js";
import PagesController from "../controller/PagesController.js";
import CategoriesController from "../controller/CategoriesController.js";
import ProductsController from "../controller/ProductsController.js";
import verifyToken from "../../../app/middlewares/verifyToken.js";
import loggedIn from "../../../util/isLogged/index.js";
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
router.route("/tables/products/:id").delete(ProductsController.delete);
router.route("/tables/products").get(ProductsController.index);
// end products

// start categories
router.route("/tables/categories/create").get(CategoriesController.create);
router.route("/tables/categories/store").post(CategoriesController.store);
router.route("/tables/categories/:id/edit").get(CategoriesController.edit);
router.route("/tables/categories/:id").put(CategoriesController.update);
router.route("/tables/categories/:id").delete(CategoriesController.delete);

// end categories

// admin
router.route("/sign-up").get(AdminController.signUp, verifyToken);
router.route("/sign-up/register").post(AdminController.register);
router.route("/sign-in").get(AdminController.signIn);
router.route("/sign-in/login").post(AdminController.login);
router.route("/logout").get(AdminController.logOut);
router.route("/").get(AdminController.index);
export default router;
