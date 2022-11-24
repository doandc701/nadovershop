import Product from "../models/Product.js";
import { mongooseToObject } from "../../util/mongoose.js";
class ProductController {
  // [GET] /product/:slug
  show(req, res, next) {
    // res.send("Học Lập Trình FullStack");
    // Model.findOne() lấy một bản ghi
    // console.log("req.params.slug ", req.params.slug);
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        // res.json(product);
        res.render("product/detail", { product: mongooseToObject(product) });
      })
      .catch(next);
  }
}
export default new ProductController();