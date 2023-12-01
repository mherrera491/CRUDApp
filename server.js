// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const Bar = require("./models/bars.js");

// CONTROLLER VARIABLES
const barController = require("./controllers/bars.js");
const userController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

// ENV VARIABLES
const mongoUrl = process.env.MONGOURI
const PORT = process.env.PORT || 3000;

// DATABASE CONNECTION
mongoose.connect(mongoUrl + 'happyhourlv');
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// CONTROLLER MIDDLEWARE
app.use("/bars", barController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

app.get("/", (req, res) => {
  Bar.find({}, (error, allBars) => {
    res.render("home.ejs", {
      bars: allBars,
      currentUser: req.session.currentUser
    });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
