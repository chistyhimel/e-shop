const express = require("express");
const path = require("path");

const app = express();

const shopRoutes = require("./routes/shop.router");
const adminRoutes = require("./routes/admin.router");
const rootDir = require("./utils/path");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  res.send("Not Found!");
});

app.listen(4000);
