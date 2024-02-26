const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    hours: String,
    price: String,
    cuisine: String,
    rating: Number,
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant