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
bars.delete("/:id", (req, res) => {
  Bar.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/bars");
  });
});

// UPDATE
bars.put("/:id", (req, res) => {
  if (req.body.hasHappyHour === "on") {
    req.body.hasHappyHour = true;
  } else {
    req.body.hasHappyHour = false;
  }
  Bar.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBar) => {
      res.redirect("/bars");
    }
  );
});

// CREATE
bars.post("/", (req, res) => {
  if (req.body.hasHappyHour === "on") {
    req.body.hasHappyHour = true;
  } else {
    req.body.hasHappyHour = false;
  }

  let newBar = {
    name: req.body.name,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    },

    hasHappyHour: req.body.hasHappyHour,
    happyHourTime: req.body.happyHourTime,
    description: req.body.description,
    img: req.body.img,
  };

  Bar.create(newBar, (error, createdBar) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.redirect("/bars");
    }
  });
});

// EDIT
bars.get("/:id/edit", (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    res.render("edit.ejs", {
      bar: foundBar,
    });
  });
});

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
