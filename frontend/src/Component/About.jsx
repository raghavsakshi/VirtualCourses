import React from 'react'
import about from '../assets/about.jpg'
import video from '../assets/video.mp4'
import { FaRegCheckCircle } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
function About() {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap 
    items-center justify-center gap-2 mb-[30px]'>
      {/* for image */}
      <div className='w-[100%] lg:w-[40%] md:w-[80%]  h-[100%] flex 
    items-center justify-center relative'>
        <img src={about} alt="" className='w-[80%] h-[90%] rounded-lg' />

      <div className='max-w-[140px] mx-auto p-4 absolute top-[45%] left-[55%] right-[0%]'>
        <video src={video} className='w-full  rounded-xl shadow-lg border-2
         border-white ' controls autoplay loop></video>
      </div>
    </div>
      {/* about info */}
      <div className='w-[100%] lg:w-[50%] md:w-[70%]  h-[100%] flex 
    items-start justify-center flex-col px-[35px] md:px-[80px] ' >
        <div className='flex text-[20px] items-center justify-center gap-[20px]'>About Us
            <TfiLayoutLineSolid className='w-[40px] h-[40px]' />
        </div>
       
        <div className='md:text-[45px] text-[35px] font-semibold'>
            We Are Maximize Your Learning Growth</div>
            <div className='text-[15px]'>We provide a modern Learning Management System to simplify online education,track progress,
                and enhance student-instructor collabration efficiently.</div>
                <div className='w-[100%] lg:w-[60%]'>
                    <div className='flex items-center justify-between mt-[40px]'>
                        <div className='flex items-center justify-center gap-[10px]'>
                             <FaRegCheckCircle className='w-[20px] h-[20px]'/>Simplified Learning</div>
                                  <div className='flex items-center justify-center gap-[10px]'>
                             <FaRegCheckCircle className='w-[20px] h-[20px]'/>Expert Trainers</div> 
                             </div>
                                    <div className='flex items-center justify-between mt-[40px]'>
                                 <div className='flex items-center justify-center gap-[10px]'>
                             <FaRegCheckCircle className='w-[20px] h-[20px]'/>Big Experience</div> 
                                 <div className='flex items-center justify-center gap-[10px]'>
                             <FaRegCheckCircle className='w-[20px] h-[20px]'/>LifeTime Access</div>
                    </div>
                </div>
    </div>
    </div>
  )
}

export default About
