const express = require("express")
const {loginUser,registerUser,adminLogin,auth, logout, authuser} = require ("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");
const userauth = require('../middleware/authuser')
 
const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/auth',adminAuth,auth)
userRouter.get('/authuser',userauth,authuser)
userRouter.post('/logout',logout)

module.exports = userRouter