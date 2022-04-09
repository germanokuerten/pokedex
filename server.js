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

app.get("/", (req, res) => {
    res.send("Test!")
})


app.listen(PORT, () => {
    console.log("PORT is listening!")
})