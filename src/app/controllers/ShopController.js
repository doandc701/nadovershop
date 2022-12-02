import Product from "../models/Product.js";
import {
  mongooseToObject,
  multipleMongooseToObject,
} from "../../util/mongoose.js";
class ShopController {
  index(req, res, next) {
    Product.find({})
      .then((product) => {
        // nhận được mảng
        res.render("shop/index", {
          product: multipleMongooseToObject(product),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        //res.json(product);
        // nhận được mảng
        res.render("shop/detail", { product: mongooseToObject(product) });
      })
      .catch(next);
  }
}
export default new ShopController();
