const Couser = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    // res.send("Học Lập Trình FullStack");
    // Model.findOne() lấy một bản ghi
    Couser.findOne({ slug: req.params.slug })
      .then((course) => {
        // res.json(course);
        res.render("course/detail", { course: mongooseToObject(course) });
      })
      .catch(next);
  }
}
module.exports = new CourseController();
