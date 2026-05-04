const orderModel = require("../models/order.Model")
const userModel = require("../models/user.model")

// Placing order using COD Method 
const PlaceOrder = async(req,res)=>{
    try {
        const {userid} = req.user
        const {items,amount,address} = req.body

        const orderData = {
            userid,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

         await orderModel.create(orderData)

         await userModel.findByIdAndUpdate(userid,{cartData:{}})

         res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Placing order using stripe Method 
const PlaceOrderStripe = async(req,res)=>{

}

// Placing order using COD Method 
const PlaceOrderRozerpay = async(req,res)=>{

}

// All Orders data for Admin Panel
const allOrder = async(req,res)=>{
    
}

// User Orders data for Frontend
const userOrder = async(req,res)=>{

}

//update order status from admin panel
const updateStatus = async(req,res)=>{

}

module.exports = {PlaceOrder,PlaceOrderRozerpay,PlaceOrderStripe,allOrder,userOrder,updateStatus}