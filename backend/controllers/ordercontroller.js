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
    try {
        const orders = await orderModel.find({})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

// User Orders data for Frontend
const userOrders = async(req,res)=>{
   try {
       const {userid} = req.user
       const orders = await orderModel.find({userid})

       res.json({success:true,orders:orders})
   } catch (error) {
       console.log(error)
       res.json({success:false,message:error})
   }
}

//update order status from admin panel
const updateStatus = async(req,res)=>{
    try {
        const {orderid,status} = req.body

        await orderModel.findByIdAndUpdate(orderid,{status})

        res.json({success:true,message:"Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

module.exports = {PlaceOrder,PlaceOrderRozerpay,PlaceOrderStripe,allOrder,userOrders,updateStatus}