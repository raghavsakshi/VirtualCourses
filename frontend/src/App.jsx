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

export const serverUrl = "http://localhost:8000"

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
        <Route path='/index.html' element={<Navigate to="/" replace />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} replace />} />
        <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} replace />} />
        <Route path='/profile' element={userData ? <Profile /> :
          (authLoading ? null : <Navigate to={"/signup"} replace />)} />

        <Route path='/forget'
          element={!userData ? <ForgetPassword /> : <Navigate to={"/"} replace />} />

        <Route path='/editprofile'
          element={userData ? <EditProfile /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/allcourses'
          element={userData ? <AllCourses /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/dashboard'
          element={userData?.role === "educator" ? <Dashboard /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/courses'
          element={userData?.role === "educator" ? <Courses /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />

        <Route path='/createCourse'
          element={userData?.role === "educator" ? <CreateCourse /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/editCourse/:courseId'
          element={userData?.role === "educator" ? <EditCourses /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/createlecture/:courseId'
          element={userData?.role === "educator" ? <CreateLecture /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/editlecture/:courseId/:lectureId'
          element={userData?.role === "educator" ? <EditLecture /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/viewcourse/:courseId'
          element={userData ? <ViewCourses /> : (authLoading ? null : <Navigate to={"/signup"} replace />)} />
        <Route path='/viewlecture/:courseId'
          element={userData ? <ViewLecture /> : (authLoading ? null : <Navigate to="/signup" replace />)} />
        <Route path='/mycourses'
          element={userData ? <MyEnrolledCourses /> : (authLoading ? null : <Navigate to="/signup" replace />)} />
        <Route path='/search'
          element={userData ? <SearchWithAi /> : (authLoading ? null : <Navigate to="/signup" replace />)} />
      </Routes>
    </>
  )
}

export default App
