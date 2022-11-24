class LoginController {
  index(req, res, next) {
    res.render("login/index");
  }
}

export default new LoginController();
