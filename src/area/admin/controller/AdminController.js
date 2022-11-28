class AdminController {
  // [GET] /index
  index(req, res) {
    res.render("admin/index", { layout: false });
  }
}
export default new AdminController();
