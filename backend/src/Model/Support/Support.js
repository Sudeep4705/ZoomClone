const mongoose = require("mongoose")
const { type } = require("node:os")
const Schema  = mongoose.Schema

const supportSchema = new Schema({
        email:{
            type:String,
            required:true
        },
        msg:{
            type:String,
            required:true
        },
        
})