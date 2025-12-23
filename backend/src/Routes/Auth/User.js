const express  =  require("express")
const router = express.Router()
const User  = require("../../Model/User/User")
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")

router.post("/signup",async(req,res)=>{
    let {username,email,password} =  req.body    
  if(!username || !email || !password){
    return res.json({message:"Please fill all the field"})
  }
 let checkemail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
 if(!checkemail){
    return res.json({message:"Please check the format of email"})
 }
 let passwordCheck = /^[a-zA-Z0-9]{8,}$/
 if(!passwordCheck){
    return res.json({ message: "Password should be at least 8 characters." });
 }
 let checkUsername = await User.findOne({username})
 if(checkUsername){
    return res.json({message:"UserName already exist Please try diffrent Username"})
 }
  else{
    const hashed  = await bcrypt.hash(password,123)
    if(!hashed){
        return res.json({message:"password"})
    }else{
        const newData = new User({
            username,email,password:hashed
        })
        await newData.save()
        const token = await jwt.sign({id:newData.id},process.env.SECRET,{expiresIn:"1d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge:5*60*60*1000
        })
        res.json({message:"Signup Successfully",success:true})
    }
  }  
})
module.exports = router