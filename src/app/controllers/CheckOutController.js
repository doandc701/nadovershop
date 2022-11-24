class CheckOutController {
  index(req, res, next) {
    res.render("checkout/index");
  }
}
export default new CheckOutController();
