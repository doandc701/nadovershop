class NewController {
  // [GET] /new
  index(req, res) {
    res.render("new");
  }
  //   [GET] /news/detail
  show(req, res) {
    res.send("Học Lập Trình FullStack");
  }
}
export default new NewController();
