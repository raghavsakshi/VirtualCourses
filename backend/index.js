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
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const port = process.env.PORT
// console.log('Loaded PORT:', port)
const app = express()
app.use(express.json())
app.use(cookieParser())



app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const isAllowed = [
            "http://localhost:5173",
            "http://localhost:8000"
        ].includes(origin) || origin.endsWith(".onrender.com");

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order", paymentRouter)
app.use("/api/review", reviewRouter)

// Serve static files from the React app
const distPath = path.resolve(__dirname, "..", "frontend", "dist")
app.use(express.static(distPath))

// Catch-all: serve the React app's index.html for any remaining requests
// Catch-all: serve the React app's index.html for any remaining requests
app.use((req, res) => {
    // Only serve index.html if it's not an API call
    if (!req.path.startsWith('/api')) {
        const indexPath = path.resolve(distPath, "index.html")
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error("Error sending index.html from path:", indexPath, err)
                res.status(500).send("Error loading the application. Please try again later.")
            }
        })
    } else {
        res.status(404).json({ message: "API endpoint not found" })
    }
})
try {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
        connectDb()
    })
} catch (error) {
    console.error('Error starting server:', error.message)
}
