const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant")
const isAuthenticated = require("../controllers/isAuthenticated")
//const restaurantSeed = require("../models/seed")

/*
Restaurant.deleteMany({})
console.log("deleted docs")

//Seed Data
Restaurant.create(restaurantSeed)
.then(data => {
    console.log("added restaurants")
    })
    .catch(err => {
    console.log(err.message)
})
*/

//Index
app.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
        res.render("./restaurant/index.ejs", {
            restaurants, 
            tabTitle: "Home",
            currentUser: req.session.currentUser
        })
    } catch(err) {
        console.log(err)
    }
})

//New
app.get("/new", isAuthenticated, async (req, res) => {
    try {
        res.render("./restaurant/new.ejs", {
            restaurant: Restaurant(req.params.id),
            tabTitle: "Add Restaurant",
            currentUser: req.session.currentUser
        })
    } catch (err) {
        console.log(err)
    }
})

//Create
app.post("/", isAuthenticated, async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body)
        res.redirect("/restaurants")
    } catch (err) {
        console.log(err)
    }
})

//Show
app.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        const comments = restaurant.comments
        res.render("./restaurant/show.ejs", {
            restaurant,
            comments,
            tabTitle: `${restaurant.name}`,
            currentUser: req.session.currentUser
        })
    } catch (err) {
        console.log(err)
    }
})

//Edit
app.get("/:id/edit", isAuthenticated, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        res.render("./restaurant/edit.ejs", {
            restaurant,
            tabTitle: `Edit | ${restaurant.name}`,
            currentUser: req.session.currentUser
        })
    } catch (err) {
        console.log(err)
    }
})

//Update
app.put("/:id", isAuthenticated, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        const edittedRes = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        edittedRes.save
        res.redirect(`/restaurants/${restaurant.id}`)
    } catch(err) {
        console.log(err)
    }
})

//Delete
app.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        await restaurant.deleteOne()
        res.redirect("/restaurants")
    } catch (err) {
        console.log(err)
    }
})


module.exports = app