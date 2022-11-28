class PagesController {
  // [GET] /tables
  index(req, res) {
    res.render("admin/pages/tables", { layout: false });
  }
}
export default new PagesController();
