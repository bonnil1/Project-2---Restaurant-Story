const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const User = require("../models/User")

//New user login form
app.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        tabTitle: "Login",
        currentUser: req.session.currentUser
    })
})

//Logging in user
app.post("/", async (req, res) => {
    try {
        const foundUser = await User.findOne({
            username: req.body.username
        }) 
        if(!foundUser) {
            res.send(`<a href="/">Sorry, no user found!</a>`)
        } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            //console.log(foundUser)
            res.redirect("/restaurants")
        } else {
            res.send(`<a href="/">Username or Password is incorrect.</a>`)
        }
    } catch(err) {
        res.send("Error...")
    }
})

//Destroy session on logout
app.delete("/", (req, res) => {
    req.session.destroy(() => {res.redirect("/restaurants")})
})

module.exports = app