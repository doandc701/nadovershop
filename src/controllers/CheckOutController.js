import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Checkout from "../models/Checkout.js";
import Users from "../models/Users.js";
import { mongooseToObject } from "../util/mongoose.js";
import { getData } from "./PaymentController.js";

class CheckOutController {
  index(req, res) {
    if (!req.session.cart) {
      return res.render("checkout/index", { products: null });
    }
    const cart = new Cart(req.session.cart);
    if (req.session.login) {
      Users.findOne({ name: req.session.user }).then((user) => {
        // console.log(user);
        return res.render("checkout/index", {
          user: mongooseToObject(user),
          products: cart.getItems(),
          totalPrice: cart.totalPrice,
        });
      });
    } else {
      return res.render("checkout/index", {
        products: cart.getItems(),
        totalPrice: cart.totalPrice,
      });
    }
  }

  orderCart(req, res, next) {
    const cart = new Cart(req.session.cart);
    const fetch = cart.getItems();
    let cartArr = [];
    for (let i = 0; i < fetch.length; i++) {
      const name = fetch[i].item.name;
      const price = fetch[i].item.price;
      const quantity = fetch[i].quantity;
      // console.log(name, price, quantity);
      cartArr.push({ name, price, quantity });
    }
    const inforCart = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      note: req.body.note,
      size: req.body.size,
      orderCart: cartArr,
      payment: req.body.payment,
      totalPrice: req.body.totalPrice,
    };
    getData(inforCart)

    // res.json(inforCart);
    const checkOut = new Checkout(inforCart);
    checkOut
      .save()
      .then(() => {
        req.session.destroy();
        res.redirect("/payment");
        // getPayment
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new CheckOutController();
