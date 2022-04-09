//////////////////////
// Pokedex
//////////////////////

require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT

const pokemon = require("./models/pokemon.js")
const morgan = require("morgan")
const methodOverride = require("method-override")


//////////////
// Middleware
//////////////

app.use(express.urlencoded({extended: false}))
app.use(morgan("tiny"))
app.use("/static", express.static("public"))
app.use(methodOverride("_method"))


//////////////
// Routes
//////////////


// Index route

app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {data: pokemon})
})


// Show route

app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {index: pokemon[req.params.id]})
})


// New route

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})


// Edit route

app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs")
})


//////////////////
// Listen Route
//////////////////

app.listen(PORT, () => {
    console.log("PORT is listening!")
})