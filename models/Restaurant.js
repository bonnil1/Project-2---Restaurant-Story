const mongoose = require("mongoose")
const User = require("../models/User")

const commentSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    description: String,
}, {timestamps: true})

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    hours: String,
    price: String,
    cuisine: String,
    rating: Number,
    img: String,
    description: String,
    parking: Boolean,
    comments: [commentSchema]
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant