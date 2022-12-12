import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Users from "../../app/models/Users.js";
import registerValidator from "../../util/validations/auth.js";
import * as dotenv from "dotenv";
dotenv.config();
class LoginController {
  index(req, res, next) {
    res.render("login/index");
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
      const newUser = await user.save();
      // await res.send(newUser);
      await res.redirect("/guest/login");
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // [POST] login
  async login(req, res) {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(422).send("Email or Password is no correct");
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) return res.status(422).send("Password is incorrect");
    // return res.send(`User ${user.name} has logged in `);
    // mỗi user đăng nhập vào sẽ được cấp một token tự động được hiểu là user đó được làm gì ?
    // tạo token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    if (checkPassword) {
      // console.log("Oke");
      // khởi tạo session
      const session = req.session;
      session.login = true;
      session.user = user.name;
      res.redirect("/");
    } else {
      res.redirect("/guest/login");
    }
    // res.header("auth-token", token).send(token);
  }
  // logout
  logOut(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

export default new LoginController();
