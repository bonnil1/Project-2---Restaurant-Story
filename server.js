require("dotenv").config()

const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")

const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI
const db = mongoose.connection

mongoose.connect(mongoURI)
db.on('error', (err) => console.log(err.message + ' is mongo not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false,
}))

app.use("/restaurants", require("./controllers/restaurantController"))
app.use("/users", require("./controllers/userController"))
app.use("/sessions", require("./controllers/sessions"))
app.use("/restaurant", require("./controllers/comments"))

app.listen(3000, () => {
    console.log("I'm listening...")
})