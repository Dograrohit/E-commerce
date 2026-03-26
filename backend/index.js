const express = require("express")
const app = express()


const port = 5000

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("hello from backend and rohit")
})

app.listen(port,()=>{console.log("server is running")})