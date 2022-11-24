import Product from "../models/Product.js";
import { mutipleMongooseToObject } from "../../util/mongoose.js";
class SiteController {
  // [GET] /home
  index(req, res, next) {
    // res.render("home");
    // Promise
    Product.find({})
      .then((product) => {
        // nhận được mảng
        res.render("index", { product: mutipleMongooseToObject(product) });
      })
      .catch(next);
  }

  //   [GET] /search
  search(req, res) {
    res.render("search");
  }
}
export default new SiteController();
