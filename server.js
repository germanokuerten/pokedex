//////////////////////
// Pokedex
//////////////////////

// .env
require("dotenv").config()

// Dependencies
const express = require("express")
const app = express()

// Config
const PORT = process.env.PORT

// Database
const pokemon = require("./models/pokemon.js")

// Sub Dependencies
const morgan = require("morgan")
const methodOverride = require("method-override")


//////////////
// Middleware
//////////////

// Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Morgan Dep
app.use(morgan("tiny"))

// Static
app.use("/static", express.static("public"))

// MethodOverride Dep
app.use(methodOverride("_method"))


//////////////
// Routes
//////////////

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", (req, res) => {
    res.send("home is working")
})

// Index route

app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {pokeData: pokemon})
})

// New route

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// Delete - Note: Look up fruits app

// Edit / Update route

app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs")
})

// Show route

app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {index: pokemon[req.params.id]})
})


//////////////////
// Listen Route
//////////////////

app.listen(PORT, () => {
    console.log(`PORT is listening! ${PORT}`)
})