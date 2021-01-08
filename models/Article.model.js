const mongoose = require("mongoose")

const Article = new mongoose.Schema({
    topic:{
        required: true,
        type: String
    },
    content:{
       type: String,
       required: true
    }
})

module.exports = mongoose.model("Article", Article)
