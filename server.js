// DEPENDENCIES
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const session = require('express-session')

// CONTROLLER VARIABLES
const barController = require("./controllers/bars.js")
const userController = require("./controllers/sessions.js")

// DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/happyhourlv')
mongoose.connection.once("open", () => {
    console.log("connected to mongo")
})

// MIDDLEWARE
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// CONTROLLER MIDDLEWARE
app.use("/bars", barController)
app.use("/users", userController)

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
