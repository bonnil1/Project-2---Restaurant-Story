const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user: String,
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