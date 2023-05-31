import Product from "../../models/Product.js";
import Categories from "../../models/Categories.js";
import { multipleMongooseToObject } from "../../util/mongoose.js";
import { mongooseToObject } from "../../util/mongoose.js";
class ProductsController {
  // [GET] admin/tables/products
  async index(req, res, next) {
    const page = req.query.p || 1;
    const showLimitProduct = 3;
    const searchs = req.query.search;
    if (searchs) {
      // console.log(searchs);
      Product.find({})
        .then((product) => {
          const data = product.filter((item) => {
            return (
              item.name.toLowerCase().indexOf(searchs.toLowerCase()) !== -1
            );
          });
          console.log(data);
          res.render("admin/pages/products/index", {
            layout: "admin.hbs",
            product: multipleMongooseToObject(data),
          });
        })
        .catch(next);
      return;
    }
    try {
      const product = await Product.find({})
        .skip(page * showLimitProduct - showLimitProduct) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(showLimitProduct)
        .populate("categories");
      // console.log(product.categories)
      const categories = await Categories.find({});
      // if(product)
      res.render("admin/pages/products/index", {
        product: multipleMongooseToObject(product),
        categories: multipleMongooseToObject(categories),
        layout: "admin.hbs",
      });
    } catch (e) {
      console.log(e);
      res.send("Sorry!");
    }
  }
  // start thêm mới một bản ghi
  // [GET] admin/tables/products/create
  create(req, res, next) {
    Categories.find({})
      .then((categories) =>
        res.render("admin/pages/products/add", {
          layout: "admin.hbs",
          categories: multipleMongooseToObject(categories),
        })
      )
      .catch(next);
  }
  // lưu một bản ghi vào database
  //   [POST] admin/tables/products/store
  store(req, res, next) {
    // res.json(req.body);
    const product = new Product(req.body);
    if (req.file) {
      // console.log("req.file", req.file);
      product.images = req.file.filename;
    }
    product
      .save()
      .then(() => {
        res.redirect("/admin/tables/products");
      })
      .catch((err) => {
        console.log(err);
      });
    // res.send("Product saved successfully");
  }
  // end thêm mới một bản ghi

  // start sửa một bản ghi vào database
  //   [GET] admin/tables/products/edit
  async edit(req, res, next) {
    // lấy params id để hiển thị từng field
    try {
      const product = await Product.findById(req.params.id);
      // console.log(product)
      const idCategories = await Categories.findById(product.categories);
      const categories = await Categories.find({});
      res.render("admin/pages/products/edit", {
        product: mongooseToObject(product),
        idCategories: mongooseToObject(idCategories),
        categories: multipleMongooseToObject(categories),
        layout: "admin.hbs",
      });
    } catch (e) {
      res.send("Sorry!");
    }
  }
  // chuyển đổi từ POST sang PUT của edit
  //  [PUT] admin/tables/products/:id
  update(req, res, next) {
    // res.json(req.body);
    const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it
    if (req.file) {
      // console.log("req.file", req.file);
      updateData.images = req.file.filename;
    }
    Product.updateOne({ _id: req.params.id }, updateData)
      .then(() => {
        res.redirect("/admin/tables/products");
      })
      .catch(next);
  }
  // end sửa một bản ghi vào database

  // [DELETE] /admin/tables/products/:id
  delete(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
export default new ProductsController();
