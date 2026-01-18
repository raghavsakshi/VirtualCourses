import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function CardPage() {
    const {courseData, creatorCourseData} =useSelector(state=>state.course)
    console.log('CardPage - courseData from Redux:', courseData)
    console.log('CardPage - creatorCourseData from Redux:', creatorCourseData)
    const [popularCourses,setPopularCourses] =useState([])
    useEffect(()=>{
      
        const combinedCourses = [...(courseData || []), ...(creatorCourseData || [])]
        console.log('CardPage - Combined courses:', combinedCourses);
        setPopularCourses(combinedCourses?.slice(0,6));
        console.log('CardPage - Set popularCourses to:', combinedCourses?.slice(0,6));
    },[courseData, creatorCourseData])
  return (
    <div className='relative flex items-center justify-center flex-col'>
     <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
      Our Popular Courses</h1> 
     <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>
      Explore top-rated courses designed to boost your skills, enhance careers,
        and unlock oppurtunites in tech, Ai, business and beyond .</span>
        <div className='w-[100%] flex items-center 
        justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
            {popularCourses?.map((course,index)=>(
                <Card key={index} thumbnail={course.thumbnail}
                title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews} />
            ))}
            {/* {(!popularCourses || popularCourses.length === 0) && (
                <div className='col-span-full text-center text-gray-500 py-8'>
                    No courses available at the moment
                </div>
            )} */}
        </div>
    </div>
  )
}

export default CardPage
