require("dotenv").config()

const express = require("express")
const app = express()

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
app.use("/restaurants", require("./controllers/restaurantController"))


app.listen(3000, () => {
    console.log("I'm listening...")
})