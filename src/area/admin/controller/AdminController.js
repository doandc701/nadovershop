class AdminController {
  // [GET] /index
  index(req, res) {
    res.render("admin/index", { layout: false });
  }
  signIn(req, res) {
    res.render("admin/users/sign-in", { layout: false });
  }
  signUp(req, res) {
    res.render("admin/users/sign-up", { layout: false });
  }
}
export default new AdminController();
