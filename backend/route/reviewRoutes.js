import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { createReview, getReviews } from '../controllers/ReviewControllers.js'
const reviewRouter =express.Router()
reviewRouter.post("/createreview", isAuth,createReview)
reviewRouter.get("/getreview",getReviews)
export default reviewRouter