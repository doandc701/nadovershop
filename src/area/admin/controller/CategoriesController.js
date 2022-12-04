import Categories from "../../../app/models/Categories.js";
import { multipleMongooseToObject } from "../../../util/mongoose.js";
import { mongooseToObject } from "../../../util/mongoose.js";
class CategoriesController {
  // [GET] /admin/pages/categories/categories
  index(req, res, next) {
    // res.render("admin/pages/categories/index", { layout: false });
    Categories.find({})
      .then((categories) =>
        res.render("admin/pages/categories/index", {
          layout: false,
          categories: multipleMongooseToObject(categories),
        }),
      )
      .catch(next);
  }
  // method CREATE
  // [POST] admin/pages/categories/create
  create(req, res, next) {
    res.render("admin/pages/categories/add", { layout: false });
  }
  store(req, res, next) {
    const categories = new Categories(req.body);
    categories
      .save()
      .then(() => res.redirect("/admin/tables/categories"))
      .catch(next);
  }
  // method EDIT
  // [GET] admin/pages/categories/edit
  edit(req, res, next) {
    Categories.findById(req.params.id)
      .then((categories) =>
        res.render("admin/pages/categories/edit", {
          layout: false,
          categories: mongooseToObject(categories),
        }),
      )
      .catch(next);
  }
  //  [PUT] admin/tables/Categoriess/:id
  update(req, res, next) {
    // res.json(req.body);
    Categories.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/admin/tables/categories");
      })
      .catch(next);
  }
  // [DELETE] /admin/tables/products/:id
  delete(req, res, next) {
    Categories.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
export default new CategoriesController();
