const express = require("express")
const cors = require('cors')
const connectDB = require('./config/MongoDB')
const dotenv = require('dotenv')
const connectCloudinary = require('./config/cloudinary')
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const cookie = require("cookie-parser")
const cartRouter = require("./routes/cartRoutes")

dotenv.config()
connectDB()
connectCloudinary()

const port = 5000
const app = express()
 
app.use(express.json());
app.use(cookie())
app.use(cors({origin:[process.env.FRONTEND,process.env.ADMIN_PANEL],credentials:true}))

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.get("/",(req,res)=>{
    res.send("hello from backend and rohit")
})

app.listen(port,()=>{console.log("server is running in "+ port)})