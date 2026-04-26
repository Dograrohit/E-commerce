const express = require("express")
const {loginUser,registerUser,adminLogin,auth, logout} = require ("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/auth',adminAuth,auth)
userRouter.post('/logout',logout)

module.exports = userRouter