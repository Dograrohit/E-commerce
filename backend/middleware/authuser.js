const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const auth = async(req,res,next)=>{
    try {
        let token = req.cookies.token

        if(!token){
            return res.json({success:false,message:"not Authorized login again"})
        }

        const verify = jwt.verify(token,process.env.JWT_SECRET)

        let user = await userModel.findById(verify.userid)

        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        
        req.user = {userid:user._id,name:user.name}

        next()

    } catch (error) {
        return res.json(error)
    }
}

module.exports = auth