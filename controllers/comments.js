const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant")

//Create
app.post("/restaurants/:id/comments", async (req, res) => {
    try {
        console.log("adding comment")
        const restaurant = await Restaurant.findById(req.params.id)
        await restaurant.comments.push(req.body)
        await restaurant.save()
        await res.redirect(`/restaurants/${restaurant.id}`)
    } catch(err) {
        console.log(err)
    }
})

module.exports = app