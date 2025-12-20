const express =  require("express")
const router = express.Router()
const Host  = require("../../Model/Meeting/Host")


router.post("/host",async(req,res)=>{
    let  {hostname,meetingid} = req.body
    if(!hostname || !meetingid){
        return res.json({message:"No id or hostName found"})
    }
    else{
        const newMeet = new Host({
            hostname,meetingid
        })
    await newMeet.save()
    }
return res.json({ "success": true,
  "message": "Meeting created",
  "meetingId":meetingid})
})



module.exports = router