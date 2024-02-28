const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant")

//Create
app.post("/:id/comments", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        await restaurant.comments.push(req.body)
        await restaurant.save()
        await res.redirect(`/restaurant/${restaurant.id}`)
    } catch(err) {
        console.log(err)
    }
})

module.exports = app