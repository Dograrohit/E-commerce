const express = require('express')
const {addtoCart,updateCart,getUserCart} = require("../controllers/cartcontroller")
const auth = require("../middleware/authuser")

const cartRouter = express.Router()

cartRouter.post('/get',auth,getUserCart)
cartRouter.post('/add',auth,addtoCart)
cartRouter.post('/update',auth,updateCart)

module.exports = cartRouter