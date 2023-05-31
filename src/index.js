import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import route from "./routes/index.js";
import db from "./config/db/index.js";
import session from "express-session";
import numbro from "numbro";
import flash from "express-flash";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
const port = 3000;
const app = express();

export const getGA = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// // change get to use it
// app.use("/admin", adminRoutes);

// HTTP logger
// app.use(morgan("combined"));

// Connect Database
db.Connect();

// static
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
// middleware => lấy ra data trong form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
// XMLHttpRequest, Axios,fetched data

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// session
app.use(
  session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 600000 },
    cookie: { secure: false },
  })
);

// session cart
app.use(function (req, res, next) {
  res.locals.session = req.session;
  // console.log("req.session",res.locals.session)
  next();
});
app.use(flash());
// template engines
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      // tạo function index + 1
      sum: (a, b) => a + b,
      formatAmount: (amount) => {
        const result = numbro(amount).format({ thousandSeparated: true });
        return result;
      },
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
