const userModel = require("../models/user.model")

// add products to user cart
const addtoCart = async(req,res)=>{
    try {
        const {userid,name} = req.user
        const {itemId,size} = req.body
        console.log("userid",userid)

        const userdata = await userModel.findById(userid)
        let cartData = await userdata.cartData

        if (!userdata) {
    return res.json({ success: false, message: "User not found" })
}
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userid,{cartData})

    res.json({success:true,message:"Add to Cart",userid,itemId,size})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
   
}


// update products to user cart
const updateCart = async(req,res)=>{
    try {
        const {userid,name} = req.user
        const {size,itemId,quantity} = req.body

        const userdata = await userModel.findById(userid)
        let cartData = await userdata.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userid,{cartData})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// getUserCart products to user cart
const getUserCart = async(req,res)=>{
    try {
        const {userid,name} = req.user

        const userdata = await userModel.findById(userid)
        let cartData = await userdata.cartData

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

module.exports = {addtoCart,updateCart,getUserCart}