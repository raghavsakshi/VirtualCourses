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
import { ClipLoader } from 'react-spinners';

export const serverUrl = "https://virtualcourses-7.onrender.com"

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
        <Route path='/signup' element={!userData ? <SignUp /> :
          <Navigate to={"/"} />} />
        <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
        <Route path='/profile' element={userData ? <Profile /> :
          <Navigate to={"/signup"} />} />

        <Route path='/forget'
          element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />} />

        <Route path='/editprofile'
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
        <Route path='/allcourses'
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/dashboard'
          element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
        <Route path='/courses'
          element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />

        <Route path='/createCourse'
          element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/signup"} />} />
        <Route path='/editCourse/:courseId'
          element={userData?.role === "educator" ? <EditCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/createlecture/:courseId'
          element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/editlecture/:courseId/:lectureId'
          element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/viewcourse/:courseId'
          element={userData ? <ViewCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/viewlecture/:courseId'
          element={userData ? <ViewLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/mycourses'
          element={userData ? <MyEnrolledCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/search'
          element={userData ? <SearchWithAi /> : <Navigate to={"/signup"} />} />
      </Routes>
    </>
  )
}

export default App
