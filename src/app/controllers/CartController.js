class CartController {
  index(req, res, next) {
    // res.send("CartController");
    res.render("cart/index");
  }
}

export default new CartController();
