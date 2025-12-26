const express = require("express");
const router = express.Router();
const Host = require("../../Model/Meeting/Host");
const Authenticate = require("../../Middleware/Authenticate");
const {Resend} =require("resend")
const wrapAsync = require("../../WrapAsync")
const Support = require("../../Model/Support/Support")


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

const resend = new Resend(process.env.RESEND_API_KEY)

router.post("/support",Authenticate, wrapAsync(async(req, res, next) => {
    let { email, msg } = req.body;
    if (!email || !msg) {
        return res.json({ message: "Please fill the form" });
    }
    const storeMail = new Support({
      email,msg,user:req.user._id
    })
    await storeMail.save()
    
    await resend.emails.send({
  from: "Support <onboarding@resend.dev>", 
  to: process.env.GMAIL_USER,               
  replyTo: email,                          
  subject: "Support Request",
  html: `
    <p><strong>User Email:</strong> ${email}</p>
    <p>${msg}</p>
  `,
});


      res.json({message:"Message Sent sucessfully",auth:true})
}));

module.exports = router;
