const mongoose = require("mongoose")
const Schema = mongoose.Schema


const hostSchema = new Schema({
    hostname:{
        type:String,
        required:true
    },
    meetingid:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Host  = mongoose.model("Host",hostSchema)
module.exports = Host