export const checkAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    // Nếu người dùng đã đăng nhập, cho phép truy cập
    next();
  } else {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    res.redirect("/admin/sign-in");
  }
};
