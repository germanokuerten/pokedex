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
app.use(express.urlencoded({extended: true}))
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
    res.render("index.ejs", {allPoke: pokemon})
})

// New route

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// Delete route

app.delete("/pokemon/:id", (req, res) => {
    // grab the index from params
    const index = req.params.id
    // splice the fruit from fruits
    pokemon.splice(index, 1)
    // redirect back to main page
    res.redirect('/pokemon')
  })

// Edit / Update route  // BUGGY!!!!!

app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        poke: pokemon[req.params.id],
        index: req.params.id
    })
})

app.put("/pokemon/:id", (req, res) => {
    // convert readyToEat to a Boolean
    // if (req.body.readyToEat === "on"){
    //   req.body.readyToEat = true
    // } else {
    //   req.body.readyToEat = false
    // }
    const pokemonNew = {...pokemon[req.params.id]}
    Object.assign(pokemonNew, req.body)
    
    pokemon[req.params.id] = pokemonNew
    
    res.redirect("/pokemon")
  })

// Show route

app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {poke: pokemon[req.params.id]})
})


//////////////////
// Listen Route
//////////////////

app.listen(PORT, () => {
    console.log(`PORT is listening! ${PORT}`)
})