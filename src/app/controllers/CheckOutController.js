import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
class CheckOutController {
  index(req, res) {
    if(!req.session.cart) {
      return res.render('checkout/index', {products: null});
    } 
    const cart = new Cart(req.session.cart)
    return res.render('checkout/index',{products: cart.getItems(), totalPrice: cart.totalPrice});
  }
  show(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err,product) {
      if(err){
        console.log(err);
        return res.redirect('/')
      }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/')
  });
  }
}
export default new CheckOutController();
