const mongoose = require("mongoose")
const User = require("../models/User")

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    username: String,
    description: String,
}, {timestamps: true})

const restaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
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
const Comment = mongoose.model("Comment", commentSchema)

module.exports = {Restaurant, Comment}