class ShopController {
  index(req, res) {
    res.render("shop/index");
  }
  show(req, res) {
    res.render("shop/detail");
  }
}

export default new ShopController();
