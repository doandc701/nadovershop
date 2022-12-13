import express from "express";
import loginController from "../../app/controllers/LoginController.js";
import verifyToken from "../../app/middlewares/verifyToken.js";
const router = express.Router();

// logout
router.get("/log-out", loginController.logOut);
// sign in
router.post("/login", loginController.login);
// sign up
router.post("/register", loginController.register);
router.get("/", loginController.index, verifyToken);
export default router;
