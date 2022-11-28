import Product from "../../../app/models/Product.js";
import { multipleMongooseToObject } from "../../../util/mongoose.js";
import { mongooseToObject } from "../../../util/mongoose.js";
class ProductsController {
  // [GET] admin/tables/products
  index(req, res, next) {
    Product.find({})
      .then((product) =>
        res.render("admin/pages/products/index", {
          layout: false,
          product: multipleMongooseToObject(product),
        }),
      )
      .catch(next);
  }
  // start thêm mới một bản ghi
  // [GET] admin/tables/products/create
  create(req, res, next) {
    res.render("admin/pages/products/add", { layout: false });
  }
  // lưu một bản ghi vào database
  //   [POST] admin/tables/products/store
  store(req, res, next) {
    // res.json(req.body);
    const product = new Product(req.body);
    product
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {});
    // res.send("Product saved successfully");
  }
  // end thêm mới một bản ghi

  // start sửa một bản ghi vào database
  //   [GET] admin/tables/products/edit
  edit(req, res, next) {
    // lấy params id để hiển thị từng field
    Product.findById(req.params.id)
      .then((product) => {
        res.render("admin/pages/products/edit", {
          layout: false,
          product: mongooseToObject(product),
        });
      })
      .catch(next);
  }
  // chuyển đổi từ POST sang PUT của edit
  //  [PUT] admin/tables/products/:id
  update(req, res, next) {
    // res.json(req.body);
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/admin/tables/products");
      })
      .catch(next);
  }
  // end sửa một bản ghi vào database
}
export default new ProductsController();
