const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const User = require("../models/User")

//new user signup page

app.get("/new", (req, res) => {
    res.render("users/new.ejs", {
        tabTitle: "Sign Up",
        currentUser: req.session.currentUser
    })
})

app.post("/", async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        console.log(req.body)
        const newUser = await User.create(req.body)
    } catch(err) {
        console.log(err)
    }
})

module.exports = app