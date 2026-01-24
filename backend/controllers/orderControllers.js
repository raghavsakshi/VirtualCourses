import razorpay from "razorpay"
import dotenv from "dotenv"
import Course from "../model/courseModel.js"
import User from "../model/UserModel.js"
dotenv.config()

export const RazorPayOrder = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay keys not configured" })
    }
    const RazorPayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const { courseId } = req.body
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course is not found" })
    }
    const options = {
      amount: course.price * 100,
      currency: 'INR',
      receipt: courseId.toString()
    }
    const order = await RazorPayInstance.orders.create(options)
    return res.status(200).json(order)
  } catch (error) {
    return res.status(500).json({ message: `failed to create Razorpay Order ${error}` })
  }
}
export const verifyPayment = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay keys not configured" })
    }
    const { courseId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const userId = req.userId

    console.log("Verifying payment - Order ID:", razorpay_order_id, "Payment ID:", razorpay_payment_id);

    const RazorPayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    // Fetch order info to check status
    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id)
    console.log("Order status from Razorpay:", orderInfo.status);

    if (orderInfo.status === 'paid' || orderInfo.status === 'attempted') {
      const user = await User.findById(userId)
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId)
        await user.save()
      }
      const course = await Course.findById(courseId).populate("lectures")
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId)
        await course.save()
      }
      return res.status(200).json({ message: "payment verified and enrollment successful" })
    }
    else {
      console.log("Payment verification failed for order:", razorpay_order_id);
      return res.status(400).json({ message: "payment failed" })
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ message: `Internal server error during payment verification ${error}` })
  }
}