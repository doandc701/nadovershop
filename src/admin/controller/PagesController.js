class PagesController {
  // [GET] /tables
  index(req, res) {
    // res.render("admin/pages/tables", { layout: "admin.hbs" });
    res.redirect("/admin/tables/categories");
  }
}
export default new PagesController();
