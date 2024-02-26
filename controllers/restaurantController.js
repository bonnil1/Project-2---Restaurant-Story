const express = require("express")
const app = express()

const Restaurant = require("../models/Restaurant")

//Index
app.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
        res.render("./restaurant/index.ejs", {restaurants, tabTitle: "Home"})
    } catch(err) {
        console.log(err)
    }
})

//New
app.get("/new", async (req, res) => {
    try {
        res.render("./restaurant/new.ejs", {
            restaurant: Restaurant(req.params.id),
            tabTitle: "Add Restaurant"
        })
    } catch (err) {
        console.log(err)
    }
})

//Create
app.post("/", async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body)
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

//Show
app.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        res.render("./restaurant/show.ejs", {
            product,
            tabTitle: `${restaurant.name}`
        })
    } catch (err) {
        console.log(err)
    }
})

//Edit
app.get("/:id/edit", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        res.render("./restaurant/edit.ejs", {
            restaurant,
            tabTitle: `Edit | ${restaurant.name}`
        })
    } catch (err) {
        console.log(err)
    }
})

//Update
app.put("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        const edittedRes = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        edittedRes.save
        res.redirect(`/${restaurant.id}`)
    } catch(err) {
        console.log(err)
    }
})

//Delete
app.delete("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
        await restaurant.deleteOne()
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})


module.exports = app