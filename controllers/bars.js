const express = require("express");
const bars = express.Router();
const Bar = require("../models/bars.js");
const barSeed = require("../models/barseed.js");

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
bars.get("", (req, res) => {
  Bar.find({}, (error, allBars) => {
    res.render("index.ejs", {
      bars: allBars,
    });
  });
});

// NEW
bars.get("/new", (req, res) => {
  res.render("new.ejs");
});

// DELETE

// UPDATE

// CREATE
bars.post("/", (req, res) => {
  if (req.body.hasHappyHour === "on") {
    req.body.hasHappyHour = true;
  } else {
    req.body.hasHappyHour = false;
  }

  Bar.create(req.body, (error, createdBar) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.redirect("/bars");
    }
  });
});

// EDIT

// SHOW
bars.get("/:id", (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    res.render("show.ejs", {
      bar: foundBar,
    });
  });
});

// Bar.create(barSeed, (err, data) => {
//     if (err) console.log(err.message);
//     console.log("added bar data")
// })

module.exports = bars;
