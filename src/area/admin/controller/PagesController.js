class PagesController {
  // [GET] /tables
  index(req, res) {
    res.render("admin/pages/tables", { layout: "admin.hbs" });
  }
}
export default new PagesController();
