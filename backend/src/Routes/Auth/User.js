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
 console.log(checkemail);
 
 if(!checkemail){
    return res.json({message:"Please check the format of email"})
 }
 let passwordCheck = /^[a-zA-Z0-9]{8,}$/
 console.log(passwordCheck);
 
 if(!passwordCheck){
    return res.json({ message: "Password should be at least 8 characters." });
 }
 let checkUsername = await User.findOne({username})
 console.log(checkUsername);
 if(checkUsername){
    return res.json({message:"UserName already exist Please try diffrent Username"})
 }
  else{
    const hashed  = await bcrypt.hash(password,10)
    console.log(hashed);
    if(!hashed){
        return res.json({message:"password"})
    }else{
        const newData = new User({
          username,email,password:hashed
        })
        await newData.save()
        const token = await jwt.sign({id:newData.id},process.env.SECRET,{expiresIn:"1d"})
        console.log(token);
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

router.post("/login",async(req,res)=>{
  let {email,password} = req.body
  if(!email || !password){
    return res.json({message:"Please fill the all field"})
  }
  const checkemail = await User.findOne({email})
  if(!checkemail){
    return res.json({message:"No account found with that email. Please register."})
  }
  const checkpassword  =  await bcrypt.compare(password,checkemail.password)
  if(!checkpassword){
    return res.json({message:"Incorrect password. Please try again."})
  }
  else{
    const token = await jwt.sign({id:checkemail.id},process.env.SECRET,{expiresIn:"1d"})
    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV == "production",
      sameSite:process.env.NODE_ENV === "production" ? "none" :"strict",
      maxAge:5*60*60*1000
    })
    return res.json({message:"Login successfully"})
  }
})

router.get("/verify",async(req,res)=>{
  let token  = req.cookies.token
  if(!token){
    return res.json({message:"No Token"})
  }
  const decode = await jwt.verify(token,process.env.SECRET)
  if(!decode){
    return res.json({message:"Please login"})
  }
  res.json({isloggedIn:true,message:"Verified"})
})

router.post("/logout",(req,res)=>{
  const token  =  req.cookies.token
  if(!token){
    res.json({message:"No token"})
  }
  res.clearCookie("token",{
     httpOnly:true,
      secure:process.env.NODE_ENV == "production",
      sameSite:process.env.NODE_ENV === "production" ? "none" :"strict",
      maxAge:5*60*60*1000
  })
  res.json({isloggedIn:false,message:"Logout Successfully"})
})
module.exports = router