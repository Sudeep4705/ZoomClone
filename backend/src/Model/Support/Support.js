const mongoose = require("mongoose")
const Schema  = mongoose.Schema
const User = require("../User/User")
const supportSchema = new Schema({
        email:{
            type:String,
            required:true
        },
        msg:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:User
        },
        sendAt:{
            type:Date,
            default:Date.now()
        }

})

const Support = mongoose.model("Support",supportSchema)
module.exports = Support