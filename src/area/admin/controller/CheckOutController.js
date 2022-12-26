import Checkout from "../../../app/models/Checkout.js";
import { multipleMongooseToObject } from "../../../util/mongoose.js";
class CheckOutController {
  // [GET] /admin/pages/order-cart
  index(req, res, next) {
    Checkout.find({})
      .then((checkOut) =>
        res.render("admin/pages/ordersCart/index", {
          layout: "admin.hbs",
          checkOut: multipleMongooseToObject(checkOut),
        })
      )
      .catch(next);
  }
}
export default new CheckOutController();
