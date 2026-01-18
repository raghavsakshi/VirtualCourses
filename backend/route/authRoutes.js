import express from "express"
import { googleAuth, login, logOut, resetPassword, sendOtp, signUp, verifyOTP } from "../controllers/authControllers.js"
// import { verify } from "jsonwebtoken"
 const authRouter = express.Router()
authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logOut",logOut)
authRouter.post("/sendotp",sendOtp)
authRouter.post("/verifyotp",verifyOTP)
authRouter.post("/resetpassword",resetPassword)
authRouter.post("/googleauth",googleAuth)

export default authRouter