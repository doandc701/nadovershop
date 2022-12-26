import Product from "../models/Product.js";
import { multipleMongooseToObject } from "../../util/mongoose.js";
class SiteController {
  // [GET] /home
  index(req, res, next) {
    // res.render("home");
    // Promise
    Product.find({})
      .then((product) => {
        // nhận được mảng
        res.render("index", { product: multipleMongooseToObject(product) });
      })
      .catch(next);
  }

  //   [GET] /search
  search(req, res,next) {
    const searchName = req.query.name;
    // console.log(searchName);
    Product.find({})
    .then((product) => {
      const data = product.filter((item) => {
        return item.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
      })
      res.render("index", { product: multipleMongooseToObject(data) });
    })
    .catch(next);
  }
  logout(req, res ,next) {
    req.session.destroy();
    res.redirect('/');
  }
}
export default new SiteController();
