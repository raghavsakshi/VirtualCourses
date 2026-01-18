import express from "express"
import { RazorPayOrder, verifyPayment } from "../controllers/orderControllers.js"
const paymentRouter = express.Router()
paymentRouter.post("/razorpay-order",RazorPayOrder)
paymentRouter.post("/verifypayment",verifyPayment)
export default paymentRouter