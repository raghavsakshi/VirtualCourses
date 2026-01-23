import express from "express"
import { RazorPayOrder, verifyPayment } from "../controllers/orderControllers.js"
import isAuth from "../middleware/isAuth.js"
const paymentRouter = express.Router()
paymentRouter.post("/razorpay-order", isAuth, RazorPayOrder)
paymentRouter.post("/verifypayment", isAuth, verifyPayment)
export default paymentRouter