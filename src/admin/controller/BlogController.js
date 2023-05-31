class BlogController {
  // [GET] /tables
  index(req, res) {
    // res.render("admin/pages/tables", { layout: "admin.hbs" });
    // res.redirect("/admin/tables/categories");
    res.send("This is coming soon");
  }
}
export default new BlogController();
