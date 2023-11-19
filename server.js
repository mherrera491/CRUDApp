// DEPENDENCIES
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const barController = require("./controllers/bars.js")

// DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/happyhourlv')
mongoose.connection.once("open", () => {
    console.log("connected to mongo")
})

// MIDDLEWARE
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride("_method"))
app.use("/bars", barController)

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
