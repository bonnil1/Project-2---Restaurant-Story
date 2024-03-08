const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant").Restaurant
const Comment = require("../models/Restaurant").Comment
const User = require("../models/User")
const isAuthenticated = require("../controllers/isAuthenticated")

//Create Comment
app.post("/restaurants/:id/comments", isAuthenticated, async (req, res) => {
    try {
        console.log("adding comment")
        const newComment = await Comment.create(req.body)
        const restaurant = await Restaurant.findById(req.params.id)
        newComment.user = req.session.currentUser
        restaurant.comments.push(newComment)
        await restaurant.save()
        //console.log(restaurant)
        await res.redirect(`/restaurants/${restaurant.id}`)
    } catch(err) {
        console.log(err)
    }
})

//Delete Comment
app.delete("/restaurants/:id/comments/:commentId", isAuthenticated, async (req, res) => {
    try {

            const restaurantId = req.params.id
            const commentId = req.params.commentId
            const restaurant = await Restaurant.findById(restaurantId)
            await restaurant.comments.id(commentId).deleteOne()
            await restaurant.save()
            console.log("comment deleted")
            res.redirect(`/restaurants/${restaurant.id}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = app
