const express = require("express");
const router = express.Router();
const Bar = require("../models/bars.js");
const barSeed = require("../models/barseed.js")

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get("", (req, res) => {
  Bar.find({}, (error, allBars) => {
    res.render("index.ejs", {
      bars: allBars,
    });
  });
});

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

// Bar.create(barSeed, (err, data) => {
//     if (err) console.log(err.message);
//     console.log("added bar data")
// })

module.exports = router;
