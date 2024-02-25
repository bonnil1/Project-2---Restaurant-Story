const express = require("express")
const app = express()

//const Restaurant = require("../models/Restaurant")


//Index
app.get("/", (req, res) => {
    res.send("hello")
})


module.exports = app