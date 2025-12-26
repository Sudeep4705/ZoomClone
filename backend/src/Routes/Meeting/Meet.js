const express = require("express");
const router = express.Router();
const Host = require("../../Model/Meeting/Host");
const Authenticate = require("../../Middleware/Authenticate");
const nodemailer = require("nodemailer")
const wrapAsync = require("../../WrapAsync")
router.post("/host", Authenticate,wrapAsync, (async (req, res,next) => {
  let { hostname, meetingid } = req.body;
  if (!hostname || !meetingid) {
    return res.json({ message: "No id or hostName found" });
  } else {
    const newMeet = new Host({
      hostname,
      meetingid,
    });
    await newMeet.save();
  }
  return res.json({
    auth:true,
    success: true,
    meetingId: meetingid,   
  });
}));

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      pass:process.env.GMAIL_PASS,
      user:process.env.GMAIL_USER
    }      
})

router.post("/support",wrapAsync(async(req,res,next)=>{
  let {email,msg} =req.body
  if(!email || !msg){
    return res.json({message:"Please fill the form"})
  }else{ 
  const mailoption = {
    from:email,
    to:process.env.GMAIL_USER,
    subject:`Support Request`,
    html:`
    <p>${msg}</p>`
  }
  const message =await  transporter.sendMail(mailoption)
  if(message){
    return res.json({message:"Message send successfully"})
  }else{
    return res.json({message:"Server error"})
  }
  }

}))

module.exports = router;
