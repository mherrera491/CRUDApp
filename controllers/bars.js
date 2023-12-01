const express = require("express");
const bars = express.Router();
const Bar = require("../models/bars.js");
const barSeed = require("../models/barseed.js");

const isAuthenticated = (req, res, next) => {
  if(req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
bars.get("", (req, res) => {
  Bar.find({}, (error, allBars) => {
    res.render("index.ejs", {
      bars: allBars,
      currentUser: req.session.currentUser
    });
  });
});

// NEW
bars.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser
  });
});

// DELETE
bars.delete("/:id", isAuthenticated, (req, res) => {
  Bar.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/bars");
  });
});

// UPDATE
bars.put("/:id", isAuthenticated, (req, res) => {
  console.log("Form Data:", req.body)
  if (req.body.hasHappyHour === "on") {
    req.body.hasHappyHour = true;
  } else {
    req.body.hasHappyHour = false;
  }

  const updateData = {
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

  Bar.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
    (err, updatedBar) => {
      res.redirect("/bars/");
    }
  );
});

// CREATE
bars.post("/", isAuthenticated, (req, res) => {
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
bars.get("/:id/edit", isAuthenticated, (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    res.render("edit.ejs", {
      bar: foundBar,
      currentUser: req.session.currentUser
    });
  });
});

// SHOW
bars.get("/:id", isAuthenticated, (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    res.render("show.ejs", {
      bar: foundBar,
      currentUser: req.session.currentUser
    });
  });
});

// Bar.create(barSeed, (err, data) => {
//     if (err) console.log(err.message);
//     console.log("added bar data")
// })

module.exports = bars;
