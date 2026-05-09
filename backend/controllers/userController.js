const userModel = require ("../models/user.model")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// Route for user login
const loginUser = async (req,res) =>{
   try {
     const {email,password} = req.body

     const user = await userModel.findOne({email})
     if(!user){
        return res.status(400).json({success:false,message:"User doesn't exists"})
     }

     const isMatch = await bcrypt.compare(password,user.password)

     if(isMatch === true){
        const token = jwt.sign({
            userid:user._id,
            email:user.email,
            name:user.name
        },process.env.JWT_SECRET)

        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"})

        return res.status(200).json({success:true,token,message:"Login Successfull"})
     }else{
        return res.status(400).json({success:false,message:"Email or Password is not correct"})
        console.log(error)
     }


   } catch (error) {
     console.log("login error",error)
     res.status(500).json({message:"Server Error"})
   }
}

// route for user register
const registerUser = async (req,res) =>{
     try {
        
        const { name, email, password } = req.body;
        
        // checking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //validtor email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a strong password"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            password:hashpassword
        })

        const token = jwt.sign({
            userid:newUser._id,
            email:newUser.email,
            name:newUser.name
        },process.env.JWT_SECRET)
 
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"})

        res.json({success:true,token,message:"Successfully Register"})

     } catch (error) {
        console.log(error)
        res.status(500).json({msg:"failed"})
     }
}

//Route for admin login
const adminLogin = async (req,res) =>{
 
    try {
        
         const{email,password} = req.body

         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token1 = jwt.sign({email,password},process.env.JWT_SECRET)
            res.cookie("token1",token1,{httpOnly:true,secure:true,sameSite:"lax"})
            res.status(200).json({success:true,message:"Welcome"})
         }else{
            res.json({success:false,message:"Invalid Credantials"})
         }

    } catch (error) {
        console.log(error)
        res.json({message:"Password or Email is Wrong"})
    }

}

//admin login check authentication 

const auth = async (req,res)=>{
   try{
       res.json({authentication:true})
   }catch(error){
      return res.status(500).json({message:"server Error"})
   }
}

const authuser = async(req,res)=>{
   try {
      res.json({success:true,message:"authenticated"})
   } catch (error) {
      return res.status(500).json({message:"server Error"})
   }
}

const logout = async(req,res)=>{
   try {
      res.clearCookie("token",{
         httpOnly:true,
         sameSite:"lax",
         secure:false
      })
      res.json({success:true,message:"logged out successfull"})
      console.log("logout")
   } catch (error) {
      return res.status(500).json({message:"server error",error})
   }
}

module.exports = {loginUser,registerUser,adminLogin,auth,logout,authuser}