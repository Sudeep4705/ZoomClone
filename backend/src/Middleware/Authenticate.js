const jwt = require("jsonwebtoken") 

const Authenticate = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json({message:"Please login",auth:false})
    }
    res.json({auth:true})
    const decoded  = await jwt.verify(token,process.env.SECRET)
    req.user = decoded
    next();
}
module.exports = Authenticate