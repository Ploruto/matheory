const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const { createProxyMiddleware } = require("http-proxy-middleware")
const Exercise = require("./models/Exercise.models")
const Article = require("./models/Article.model")

const router = express.Router()

router.post("/api/article", async (req, res) => {
    // Store article
    await Article.updateOne({
        topic: req.body.topic
    }, { content: req.body.content });

    res.end()
})

router.post("/api/exercise", async (req, res) => {
    // Store article 
    console.log(req.body)
    await Exercise.updateOne({
        name: req.body.topic
    }, { tasks: req.body.nonNullContent });

    
    res.end()
})


router.get("/api/practice/:id", (req, res) => {

    req.params.id = req.params.id.replace(/%20/g, " ");
    Exercise.find({
        name: (req.params.id)
    }).then(data => {
        if(!data) return
        data[0].name = req.params.id
        res.send(data)
    }).catch(error => {
        console.log("error", error)
    })
})

router.get("/api/learn/:id", (req, res) => {
    Article.find({
        topic: (req.params.id)
    }).then(data => {
        res.send(data)

    }).catch(error => {
        console.log("error", error)
    })
})

router.get("/api/create-article", (req, res) => {

    Article.find({}).then(data => {

        
        res.send(data)
    }).catch(error => {
        console.log("error", error)
    })
})


router.get("/api/create-exercise", (req, res) => {

    Exercise.find({}).then(data => {
        res.send(data)
    }).catch(error => {
        console.log("error", error)
    })
})

/**
 * Serve react app
 */
if (process.env.NODE_ENV === "development") {
    // Create proxy to dev-server
    router.use("/", createProxyMiddleware({
        target: "http://localhost:3000/",
        ws: true
    }))
} else {
    // Serve static files (.js, images, etc.)
    router.use(express.static(path.join(__dirname, "public")))
    // Serve react app on all remaining routes
    router.get("/*", (req, res) => res.sendFile(path.resolve(__dirname, "public", "index.html")))
}




module.exports = router
