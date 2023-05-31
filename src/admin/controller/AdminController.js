import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Users from "../../models/Users.js";
import Role from "../../models/Role.js";
import registerValidator from "../../util/validations/auth.js";
import * as dotenv from "dotenv";
dotenv.config();
class AdminController {
  // [GET] /index
  index(req, res) {
    if (req.session.login) {
      res.render("admin/index", { layout: "admin.hbs" });
    } else {
      req.session.back = "/admin/";
      // res.render("admin/index", { layout: "admin.hbs" });
      res.redirect("/admin/sign-in");
    }
  }
  signIn(req, res) {
    res.render("admin/users/sign-in", { layout: false });
  }
  signUp(req, res) {
    res.render("admin/users/sign-up", { layout: false });
  }
  // [POST] register
  async register(req, res, next) {
    const { errors } = registerValidator(req.body);
    if (errors) return res.status(422).send(errors.details[0].message);
    const checkMailExits = await Users.findOne({ email: req.body.email });
    if (checkMailExits) return res.status(422).send("Email not exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    try {
      user
        .save()
        .then((user) => {
          // console.log("user", user);
          const RqRoles = req.body.roles;
          if (RqRoles) {
            Role.find({ name: { $in: RqRoles } })
              .then((roles) => {
                // console.log("roles", roles);
                user.roles = roles.map((role) => role._id);
                user
                  .save()
                  .then(() => {
                    res.redirect("/admin/sign-in");
                  })
                  .catch((err) => {
                    res.status(500).send({ message: err });
                    return;
                  });
              })
              .catch((err) => {
                res.status(500).send({ message: err });
                return;
              });
          } else {
            Role.findOne({ name: "user" })
              .then((role1) => {
                // Error, role1._id may be null or undefined
                console.log("ObjectId+++++++", role1);
                user.roles = [role1._id];
                user
                  .save()
                  .then(() => {
                    res.redirect("/admin/sign-in");
                  })
                  .catch((err) => {
                    res.status(500).send({ message: err });
                    return;
                  });
              })
              .catch((err) => {
                res.status(500).send({ message: err });
                return;
              });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err });
          return;
        });
      // await res.send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // [POST] login
  async login(req, res) {
    const email = await Users.findOne({ email: req.body.email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/sign-in");
    }
    if (!email) {
      // req.flash("error", "Email or Password is no correct");
      return res.redirect("/admin/sign-in");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      email.password
    );
    if (!checkPassword) {
      req.flash("error", { msg: " Password is no correct" });
      return res.redirect("/admin/sign-in");
    }
    // return res.send(`User ${user.name} has logged in `);
    // mỗi user đăng nhập vào sẽ được cấp một token tự động được hiểu là user đó được làm gì ?
    // tạo token
    const token = jwt.sign({ _id: email._id }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    // khởi tạo session
    req.session.isAuthenticated = true;
    res.redirect("/admin/dashboard");
  }
  // logout
  logOut(req, res) {
    req.session.destroy();
    res.redirect("/admin");
  }
}
export default new AdminController();
