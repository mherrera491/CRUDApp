const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const { createIndexes } = require('../models/bars.js')

users.get("/new", (req, res) => {
    res.render("users/new.ejs", {
        currentUser: req.session.currentUser
    })
})

users.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err);
        }
        req.session.currentUser = createdUser;
        console.log('User is created', createdUser)
        res.redirect("/")
    })
})

module.exports = users