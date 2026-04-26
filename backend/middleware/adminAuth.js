const jwt = require("jsonwebtoken")

const adminAuth = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
       
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
         req.user = decoded

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,Message:error.message})
    }
}

module.exports = adminAuth