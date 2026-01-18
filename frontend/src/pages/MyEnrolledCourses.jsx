import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import Nav from '../Component/Nav';

function MyEnrolledCourses() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <div className='min-h-screen  w-full px-4 py-9 pt-24 bg-gray-50'>
      <Nav />

      <FaArrowLeft className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer'
        onClick={() => navigate("/")} />
      <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>My Enrolled Courses</h1>
      {userData?.enrolledCourses?.length === 0 ? (
        <p className='text-gray-500  text-center w-full'>You haven't enrolled in any course yet.</p>
      )
        : (
          <div className='flex  items-center justify-center flex-wrap gap-[30px]'>
            {userData?.enrolledCourses?.map((course, index) => (
              <div key={index} className='bg-white rounded-2xl border shadow-md overflow-hidden '>
                <img src={course?.thumbnail} className='w-full h-40 object-cover' />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800'>{course?.title}</h2>
                  <p className='text-sm mb-2 text-gray-600'>{course?.category}</p>
                  <p className='text-sm mb-2 text-gray-600'>{course?.level}</p>
                  <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white
                 rounded-[10px] text-[15px] font-light cursor-pointer mt-[10px] hover:bg-gray-600' onClick={() => navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default MyEnrolledCourses
