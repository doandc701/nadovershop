class CategoriesController {
  // [GET] /categories
  index(req, res) {
    res.render("admin/pages/categories/index", { layout: false });
  }
}
export default new CategoriesController();
