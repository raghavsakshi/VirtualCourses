import express from 'express'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { getCurrentUser, updateProfile } from '../controllers/userControllers.js'
const userRouter =  express.Router()

userRouter.get("/getCurrentuser",isAuth,getCurrentUser)

userRouter.post("/profile",isAuth,upload.single("photoUrl"),updateProfile)
export default userRouter