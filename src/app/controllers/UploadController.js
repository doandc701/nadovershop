class UploadController {
  // [GET] /new
  index(req, res) {
    res.render("uploads");
    // res.send("Học Lập Trình FullStack");
  }
  //   [GET] /news/detail
  show(req, res) {
    res.send("Học Lập Trình FullStack");
  }
}
module.exports = new UploadController();
