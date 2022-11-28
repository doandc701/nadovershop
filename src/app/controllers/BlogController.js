class BlogController {
  // [GET] /blog
  index(req, res) {
    res.render("blog/index");
  }
  //   [GET] /blog/detail
  show(req, res) {
    res.send("Học Lập Trình FullStack");
  }
}
export default new BlogController();
