import Product from "../models/Product.js";
import Categories from "../models/Categories.js";
// console.log(Categories);
import {
  mongooseToObject,
  multipleMongooseToObject,
} from "../../util/mongoose.js";
class ShopController {
  index = async (req, res, next) => {
    try {
      const product = await Product.find();
      const categories = await Categories.find();
      res.render("shop/", {
        product: multipleMongooseToObject(product),
        categories: multipleMongooseToObject(categories),
      });
    } catch (e) {
      res.send("Sorry!");
    }
  };
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
