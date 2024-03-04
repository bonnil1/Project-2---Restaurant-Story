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
app.delete("/restaurants/:id/comments", isAuthenticated, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        //const comments = restaurant.comments
        //console.log(comments)
        console.log(req.params.id)
        const commentId = req.params.comments.id
        console.log(commentId)
        //await Restaurant.comments.id("65e4f1ed4dd90021db06f7fb").remove()
        //console.log(comment)
        //await comments.deleteOne()
        //await Restaurant.save;
        console.log("comment removed")
        res.redirect(`/restaurants/${restaurant.id}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = app