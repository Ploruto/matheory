const { triggerAsyncId } = require("async_hooks");
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const routes = require("./routes.js")
const Exercise = require("./models/Exercise.models")
const Article = require("./models/Article.model")

const app = express()
const PORT = process.env.PORT;

let topics = ["Ratios, Rates, and Proportions", "Percents", "Real Numbers", "Solving Equations and Inequalities", "Graphing Linear Equations and Inequalities","Algebra I", "Algebra II", "Calculus I", "Calculus II", "Geometry","Calculus and analysis", "Geometry and topology", "Combinatorics","Logic", "Number theory","Fractions and Decimals", "Place Value", "Addition and subtraction","Multiplication and Division", "Counting", "Estimating","Shape and Space", "Measurement", "Data Handling", "simple Algebra","Topic I", "Topic II", "Topic III"]


mongoose.connect(require("./config").db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("mongoose connected"))


if (process.env.NODE_ENV === "development") {
    app.use(cors())
}

app.use(express.json())
app.use("/", routes)

/* topics.forEach( async (topic) =>{
    newExercise = new Exercise({
        name: topic,
        tasks:[
            {exercise: "1+1", solution:"2"},
            {exercise: "2+2", solution:"4"},
            {exercise: "3+3", solution:"6"},
        ]
    })
    await newExercise.save()
})
 */

// Temporary route
/* app.get("/api/practice/:id", (req, res) => {
    console.log(req.params.id)
    Exercise.find({
        name: (req.params.id)
    }).then(data => {
        data[0].name = req.params.id
        res.send(data)
    }).catch(error => {
        console.log("error", error)
    })
}) */


app.listen(PORT, console.log("Server is running" + PORT))