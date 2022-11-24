import express from "express";
const app = express();
import morgan from "morgan";
import { engine } from "express-handlebars";
const port = 3000;
import route from "./routes/index.js";
import db from "./config/db/index.js";

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

// template engines
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/view");

// routes init
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
