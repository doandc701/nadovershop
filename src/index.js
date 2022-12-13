import express from "express";
const app = express();
import morgan from "morgan";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
const port = 3000;
import route from "./routes/index.js";
import db from "./config/db/index.js";
import session from "express-session";
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
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
// template engines
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      // tạo function index + 1
      sum: (a, b) => a + b,
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
