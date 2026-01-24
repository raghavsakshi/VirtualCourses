import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourse from './pages/Educator/CreateCourse'
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourses from './pages/Educator/EditCourses'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import EditLecture from './pages/Educator/EditLecture'
import CreateLecture from './pages/Educator/CreateLecture'
import ViewCourses from './pages/ViewCourses'
import ScrollToTop from './Component/ScrollToTop'
import ViewLecture from './pages/ViewLecture'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import getAllReview from './customHooks/getAllReview'
import SearchWithAi from './pages/SearchWithAi'
import ReviewPage from './Component/ReviewPage'
import { ClipLoader } from 'react-spinners';

export const serverUrl = import.meta.env.MODE === "production" ? "" : "http://localhost:8000"

function App() {
  getCurrentUser()
  getCreatorCourse()

  getPublishedCourse()
  getAllReview()
  const { userData, authLoading } = useSelector(state => state.user)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="black" size={50} />
      </div>
    )
  }

  return (

    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={!authLoading && !userData ? <SignUp /> :
          !authLoading ? <Navigate to={"/"} replace /> : null} />
        <Route path='/login' element={!authLoading && !userData ? <Login /> :
          !authLoading ? <Navigate to={"/"} replace /> : null} />

        <Route path='/profile' element={!authLoading && userData ? <Profile /> :
          !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/forget'
          element={!authLoading && !userData ? <ForgetPassword /> :
            !authLoading ? <Navigate to={"/"} replace /> : null} />

        <Route path='/editprofile'
          element={!authLoading && userData ? <EditProfile /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/allcourses'
          element={!authLoading && userData ? <AllCourses /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/dashboard'
          element={!authLoading && userData?.role === "educator" ? <Dashboard /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/courses'
          element={!authLoading && userData?.role === "educator" ? <Courses /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/createCourse'
          element={!authLoading && userData?.role === "educator" ? <CreateCourse /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/editCourse/:courseId'
          element={!authLoading && userData?.role === "educator" ? <EditCourses /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/createlecture/:courseId'
          element={!authLoading && userData?.role === "educator" ? <CreateLecture /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/editlecture/:courseId/:lectureId'
          element={!authLoading && userData?.role === "educator" ? <EditLecture /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/viewcourse/:courseId'
          element={!authLoading && userData ? <ViewCourses /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/viewlecture/:courseId'
          element={!authLoading && userData ? <ViewLecture /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/mycourses'
          element={!authLoading && userData ? <MyEnrolledCourses /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/search'
          element={!authLoading && userData ? <SearchWithAi /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />

        <Route path='/reviews'
          element={!authLoading && userData ? <ReviewPage /> :
            !authLoading ? <Navigate to={"/login"} replace /> : null} />
      </Routes>
    </>
  )
}

export default App
