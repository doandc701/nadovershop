import adminRouter from "../area/admin/router/index.js";
import blogController from "./modules/blog.js";
import checkoutRouter from "./modules/checkout.js";
import loginRouter from "./modules/login.js";
import contactRouter from "./modules/contact.js";
import cartRouter from "./modules/cart.js";
import shopRouter from "./modules/shop.js";
import productRouter from "./modules/product.js";
import siteController from "./modules/site.js";
const route = (app) => {
  // req :request gửi đi một yêu cầu
  // res : respone phản hồi
  app.use("/admin", adminRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/guest/login", loginRouter);
  app.use("/shopping-cart", cartRouter);
  app.use("/contact", contactRouter);
  app.use("/blog", blogController);
  app.use("/san-pham", productRouter);
  app.use("/shop", shopRouter);
  app.use("/", siteController);

  app.post("/search", (req, res) => {
    console.log(req.body.q);
    res.send("");
  });
};
export default route;
