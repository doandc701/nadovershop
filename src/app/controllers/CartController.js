import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

class CartController {
  index(req, res, next) {
    // res.send("CartController");
    var productId=req.params.id;
    //console.log(productId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('cart/index',{products: cart.getItems(), totalPrice: cart.totalPrice});

    Product.findById(productId, function(err,product) {
      if(err){
        //return res.redirect('/');
        console.log(err);
      }
      //return item.id == productId;
    cart.add(product, productId);
    req.session.cart = cart;
    var result = req.session.cart;
    // console.log("result",result);
  });
  }

}
export default new CartController();