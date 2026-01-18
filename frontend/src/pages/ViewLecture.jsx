import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'

import { FaArrowLeft } from "react-icons/fa";
import Nav from '../Component/Nav';


function ViewLecture() {
  const { courseId } = useParams()
  const { courseData } = useSelector(state => state.course)
  const selectedCourse = courseData?.find((course) => course._id === courseId)
  const [creatorData, setCreatorData] = useState(null)
  const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lecture?.[0] || null)
  const navigate = useNavigate()
  useEffect(() => {

    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator }, { withCredentials: true })
          console.log(result.data)
          setCreatorData(result.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleCreator()
  }, [selectedCourse])
  return (
    <div className='min-h-screen
     bg-gray-50 p-6 pt-24 flex flex-col md:flex-row gap-6'>
      <Nav />

      {/* {  left or top} */}
      <div className='w-full md:w-/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
        <div className='mb-6'>
          <h2 className='text-2xl fonnt-bold flex items-center 
      justify-start gap-[20px] text-gray-800'> < FaArrowLeft className='text-black 
       w-[22px] h-[22px] cursor-pointer ' onClick={() => navigate("/")} />{selectedCourse?.title}</h2>
          <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium'>
            <span> Category : {selectedCourse?.category}</span>
            <span> Level : {selectedCourse?.level}</span>
          </div>
        </div>
        {/* video player */}
        <div className='aspect-video bg-black rounded-xl 
      overflow-hidden mb-4 border border-gray-300'>{selectedLecture?.videoUrl ?
            <video className='w-full h-full object-cover ' src={selectedLecture?.videoUrl} controls /> :
            <div className='flex items-center justify-center h-full text-white'>
              Select a lecture to start watching
            </div>}
        </div>
        <div className='mt-2'>
          <h2 className='text-xl font-semibold'>{selectedLecture?.lectureTitle}</h2>
        </div>
      </div>
      {/* right or btttm */}
      <div className=' w-full md:w-1/3 bg-white rounded-2xl 
       shadow-md p-6 border border-gray-200 h-fit'>
        <h2 className='text-xl font-bold  mb-4 text-gray-800'>All Lectures</h2>
        <div className='flex flex-col gap-3 mb-6'>
          {selectedCourse?.lecture?.length > 0 ?
            (selectedCourse?.lecture?.map((lecture, index) => (
              < button key={index} onClick={() => setSelectedLecture(lecture)} className={`flex items-center justify-between p-3 rounded-lg
     border transition  text-left ${selectedLecture?._id === lecture._id ? 'bg-gray-200 border-gray-500' : 'hover:bg-gray-50 border-gray-300'}`}>
                <h2 className=' text-sm font-semibold text-gray-800 '>
                  {lecture.lectureTitle}</h2>
                <FaCirclePlay className='text-lg text-black' />
              </button>

            )))
            :
            (<p className='text-gray-500'>No lectures available.</p>
            )}
        </div>
        {/* eductor info */}
        {creatorData &&
          <div className='mt-4 border-t pt-4'>
            <h3 className='text-md font-semibold text-gray-700 mb-3'>Educator</h3>
            <div className='flex items-center gap-4'><img src={creatorData?.photoUrl} alt=''
              className='w-14 h-14 rounded-full object-cover'></img></div>
            <div>
              <h2 className='text-base font-medim text-gray-800'>{creatorData?.name}</h2>
              <p className='text-sm text-gray-600'>{creatorData?.description}</p>
              <p className='text-sm text-gray-600'>{creatorData?.email}</p>

            </div>
          </div>}
      </div>
    </div>
  )
}

export default ViewLecture
