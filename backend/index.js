import dotenv from 'dotenv'
import express from "express"
import connectDb from './config/connectdb.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoutes.js'
import cors from 'cors'
import userRouter from './route/userRoutes.js'
import courseRouter from './route/courseRoutes.js'
import paymentRouter from './route/paymentRoutes.js'
import reviewRouter from './route/reviewRoutes.js'
dotenv.config()
const port = process.env.PORT
// console.log('Loaded PORT:', port)
const app=express()
app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)

app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.use("/api/order",paymentRouter)
app.use("/api/review",reviewRouter)
app.get("/",(req,res)=>{
res.send("Hello from server")
})
try {
    app.listen(port,()=>{
        console.log(`Server started on port ${port}`)
        connectDb()
    })
} catch (error) {
    console.error('Error starting server:', error.message)
}