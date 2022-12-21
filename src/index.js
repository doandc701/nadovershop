import express from "express";
const app = express();
import morgan from "morgan";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
const port = 3000;
import route from "./routes/index.js";
import db from "./config/db/index.js";
import session from "express-session";
import numbro from "numbro"
// import adminRoutes from "../src/area/admin/router/index.js";

// // change get to use it
// app.use("/admin", adminRoutes);

// HTTP logger
// app.use(morgan("combined"));

// Connect Database
db.Connect();

// static
app.use(express.static("public"));

// middleware => lấy ra data trong form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// XMLHttpRequest, Axios,fetched data

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// session
app.use(
  session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

// session cart
app.use(function(req, res, next){
  res.locals.session = req.session;
  // console.log("req.session",res.locals.session)
  next();
});
// template engines
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      // tạo function index + 1
      sum: (a, b) => a + b,
      formatAmount: (amount) => {
        const result = numbro(amount).format({thousandSeparated: true});
        return result;
      }
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./src/view");

// routes init
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
