import Users from "../models/Users.js";

const authPage = (permission) => {
  return async (req, res, next) => {
    const { email } = req.body;
    // console.log("name", name);
    const result = await Users.findOne({ email });
    if (!result) {
      next();
      return;
    }
    // console.log("result", result.roles.toString());
    // console.log(result?.roles.toString());
    // console.log(!permission.includes(result.roles.toString()));
    if (!permission.includes(result.roles.toString())) {
      // return req.flash("infor", "You dont have permission!");
      req.flash("info", { msg: "You dont have permission!" });
      return res.redirect("/admin/sign-in");
    }
    next();
  };
};

export default authPage;
