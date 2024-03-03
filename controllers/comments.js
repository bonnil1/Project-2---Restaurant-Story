const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant")
const isAuthenticated = require("../controllers/isAuthenticated")

//Create
app.post("/restaurants/:id/comments", isAuthenticated, async (req, res) => {
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

//Delete
app.delete("/restaurants/:id/comments/:index", isAuthenticated, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        const comments = await Restaurant.comments.findById(req.params.index)
        console.log(comments)
        await comments.deleteOne()
        res.redirect(`/restaurants/${restaurant.id}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = app