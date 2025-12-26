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

router.post("/support", wrapAsync(async(req, res, next) => {
  let { email, msg } = req.body;

  if (!email || !msg) {
    return res.json({ message: "Please fill the form" });
  }

  const mailoption = {
    from: process.env.GMAIL_USER, // Authenticated user (Required for production)
    to: process.env.GMAIL_USER,   // Send to yourself
    replyTo: email,               // Reply to the user
    subject: `Support Request`,
    html: `<p><strong>From:</strong> ${email}</p><p>${msg}</p>`
  };

  try {
    // Attempt to send the email
    await transporter.sendMail(mailoption);
    return res.json({ message: "Message sent successfully" });

  } catch (error) {
    // ⬇️ THIS IS THE IMPORTANT PART ⬇️
    // Instead of just saying "Server error", we send the REAL reason back to you.
    console.error("Email Error:", error);
    return res.status(500).json({ 
        message: "Email Failed", 
        real_error: error.message, // This will tell us if it's a Password or IP issue
        code: error.code 
    });
  }
}));

module.exports = router;
