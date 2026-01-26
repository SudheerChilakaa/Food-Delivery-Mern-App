import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js"
// appp config
const app = express()
const port = process.env.PORT || 5001

// middleware
app.use(express.json())
app.use(cors())



// Db Connection
connectDB()

// API Endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


 
app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://fooddel:Sudheer627@cluster0.hiewaq4.mongodb.net/?