import express from 'express'
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from '../controllers/courseController.js'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { searchWithAi } from '../controllers/searchControllers.js'
const courseRouter = express.Router()
courseRouter.post("/create", isAuth, createCourse)
courseRouter.get("/getPublished", getPublishedCourses)
courseRouter.get("/getCreator", isAuth, getCreatorCourses)
courseRouter.post("/editCourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getCourse/:courseId", isAuth, getCourseById)
courseRouter.delete("/remove/:courseId", isAuth, removeCourse)



// for lecture
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
courseRouter.get("/creator/:userId", isAuth, getCreatorById)

// for search
courseRouter.post("/search", searchWithAi)
export default courseRouter
