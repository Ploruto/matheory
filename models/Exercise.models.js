const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    exercise:{
        type:String,
        required:true
    },
    solution:{
        type:String,
        required:true
    }
})

const Exercise = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    tasks:[taskSchema]
})

module.exports = mongoose.model("Exercise", Exercise)
