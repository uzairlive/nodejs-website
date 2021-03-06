// Core modules
const http = require("http");
const path = require("path");

// custom modules / files
// const routes = require('./routes');

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const rootDir = require("./util/path");
const errorController = require("./controllers/error");

const app = express();

// app.engine(
//     "hbs",
//     expressHbs({
//         layoutsDir: "views/layouts/",
//         defaultLayout: "main-layout",
//         extname: "hbs"
//     })
// );

app.set("view engine", "ejs");
// app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("views", "views");

// const adminData = require("./routes/admin");
// CHANGING WORK FROM ROUTES TO CONTROLLER
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// app.use((req, res, next) => {
//     console.log('In the middleware');
//     next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// app.use((req, res, next) => {
//     res.status(404).render("404", { pageTitle: "Page not Found", layout: false });
//     // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
// });

// app.use('/', (req, res, next) => {
//     console.log('This always Run');
//     next();
// });

const server = http.createServer(app);

server.listen(3000);