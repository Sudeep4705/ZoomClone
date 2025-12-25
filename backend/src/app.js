require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser =require("cookie-parser")
const MongoUrl = process.env.MONGO_URL
const meetingRoute = require("../src/Routes/Meeting/Meet")
const userRoute = require("../src/Routes/Auth/User")
const Cors = require("cors")
const app = express()

async function Db() {
    await mongoose.connect(MongoUrl)
}

Db()
.then(()=>{
    console.log("Database Connected");
    
})
.catch((err)=>{
console.log(err);

})

app.use(Cors({origin:"https://zoom-clo-ne.netlify.app",credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// routes
app.use("/meet",meetingRoute)
app.use("/user",userRoute)





module.exports = app