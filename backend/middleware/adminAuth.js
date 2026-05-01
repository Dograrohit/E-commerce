const jwt = require("jsonwebtoken")

const adminAuth = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
       
        if(decoded.email !== process.env.ADMIN_EMAIL && decoded.password !== process.env.ADMIN_PASSWORD ){
            return res.json({success:false,message:"Not Authorized Login Again"})
            console.log("not Working")
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,Message:error.message})
    }
}

module.exports = adminAuth