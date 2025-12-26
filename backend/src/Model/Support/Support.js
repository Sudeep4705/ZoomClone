const mongoose = require("mongoose")
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
        user:{
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