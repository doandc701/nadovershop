import newController from "./modules/news.js";
// import uploadController from "./modules/upload";
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
  // app.use(require("./routes/router").router);
  // app.use("/upload", uploadController);
  app.use("/checkout", checkoutRouter);
  app.use("/guest/login", loginRouter);
  app.use("/contact", contactRouter);
  app.use("/shopping-cart", cartRouter);
  app.use("/shop", shopRouter);
  app.use("/san-pham", productRouter);
  // app.use("/news", newController);
  app.use("/news", newController);
  app.use("/", siteController);

  app.post("/search", (req, res) => {
    console.log(req.body.q);
    res.send("");
  });
};
export default route;
