import React from 'react'
import home from '../assets/home1.jpg'
import Nav from '../Component/Nav'
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'

import { SiViaplay } from "react-icons/si";
import Logos from '../Component/logos'
import ExploreCourses from '../Component/ExploreCourses'
import CardPage from '../Component/CardPage'
import { Navigate, useNavigate } from 'react-router-dom'
import usePublishedCourses from '../customHooks/getPublishedCourse'
import useCreatorCourses from '../customHooks/getCreatorCourse'
import Footer from '../Component/Footer'
import About from '../Component/About'
import ReviewPage from '../Component/ReviewPage'

function Home() {
  const navigate = useNavigate()
  usePublishedCourses()
  useCreatorCourses()

  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav />
        <img src={home} className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' alt=''></img>

        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] 
     w-[100%] flex items-center justify-center text-white font-bold text-[20px]'> Grow your Skills to Advance</span>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] 
     w-[100%] flex items-center justify-center text-white font-bold 
     '>Your Career path</span>
        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%]  flex items-center justify-center gap-3 flex-wrap'>
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black rounded-[10px]
       lg:text-white text-black text-[18px] font-light flex gap-2 cursor-pointer'
            onClick={() => navigate("/allcourses")}>View All Courses
            <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' /></button>
          <button className='px-[20px] py-[10px] lg:bg-white bg-black rounded-[10px]
       lg:text-black text-white text-[18px]  rounded-[10px] font-light flex gap-2 
       cursor-pointer items-center justify-center' onClick={() => navigate("/search")}>Search With Ai
            <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt=''></img>
            <img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden ' alt='' /></button>
        </div>

      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  )
}

export default Home
