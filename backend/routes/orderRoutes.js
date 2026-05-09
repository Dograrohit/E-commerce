const express = require("express")
const {PlaceOrder,PlaceOrderRozerpay,PlaceOrderStripe,allOrder,userOrders,updateStatus} = require("../controllers/ordercontroller")
const adminAuth = require("../middleware/adminAuth")
const authuser = require("../middleware/authuser")

const OrderRouter = express.Router()

//Admin Features
OrderRouter.post("/list",adminAuth,allOrder)
OrderRouter.post("/status",adminAuth,updateStatus)

//Payment Method
OrderRouter.post("/place",authuser,PlaceOrder)
OrderRouter.post("/stripe",authuser,PlaceOrderStripe)
OrderRouter.post("/rozerpay",authuser,PlaceOrderRozerpay)

//User Feature
OrderRouter.post("/userorders",authuser,userOrders)

module.exports = OrderRouter