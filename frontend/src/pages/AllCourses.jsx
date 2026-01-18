import React, { useCallback, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Nav from '../Component/Nav';
import { useNavigate } from 'react-router-dom';
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';
import { BsTranslate } from 'react-icons/bs';
import Card from '../Component/Card';
import usePublishedCourses from '../customHooks/getPublishedCourse';
function AllCourses() {
    usePublishedCourses() // Ensure courses are fetched
    const navigate = useNavigate()
    const { courseData } = useSelector(state => state.course)
    const [category, setCategory] = useState([])
    const [filterCourse, setFilterCourse] = useState([])

    const [isSideBarVisible, setSideBarVisible] = useState(false)
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const applyFilter = useCallback(() => {
        if (!courseData) return;
        let courseCopy = courseData.slice()
        if (category.length > 0) {
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourse(courseCopy)
    }, [category, courseData])

    useEffect(() => {
        applyFilter()
    }, [category, applyFilter, courseData])

    return (
        <div className=' flex min-h-screen bg-gray-50'>
            <Nav />
            <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1
       rounded md:hidden border-3 border-black' onClick={() => setSideBarVisible(prev => !prev)}>
                {isSideBarVisible ? 'Hide' : 'Show '
                } Filters
            </button>
            {/* sidebar */}
            <aside className={`w-[260px] h-screen overflow-y-auto 
      bg-black fixed top-0 p-6 py-[130px] border-r border-gray-200
       shadow-md transition-transform duration-300 z-5 ${isSideBarVisible ? 'translate-x-0' : '-translate-x-full '} 
       md:block md:translate-x-0`}>
                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'>
                    <FaArrowLeft className='text-white ' onClick={() => navigate("/")} />
                    Filter by Category</h2>
                <form action="" onSubmit={(e) => e.preventDefault()} className='space-y-4 text-sm bg-gray-600 
    border-white text-[white] border p-[20px] rounded-2xl'>
                    <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px]
         text-[15px] font-light flex items-center justify-center gap-2' onClick={() => navigate("/search")}>Search With Ai
                        <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full' /></button>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'APP Development'} onChange={toggleCategory} />
                        App Development
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Web Development'} onChange={toggleCategory} />
                        Web Development
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Data Science'} onChange={toggleCategory} />
                        Data Science
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        UI UX Designing  <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'UI UX Designing'} onChange={toggleCategory} />

                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Data Analytics'} onChange={toggleCategory} />
                        Data Analytics
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Ethical Hacking'} onChange={toggleCategory} />
                        Ethical Hacking
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'AI/ML'} onChange={toggleCategory} />
                        AI ML
                    </label>
                    <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'AI Tools'} onChange={toggleCategory} />
                        AI Tools
                    </label>
                    <label className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                        <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Others'} onChange={toggleCategory} />
                        Others
                    </label>
                </form>
            </aside>
            <main className='w-full transition-all duration-300  py-[130px] md:pl-[300px] flex items-start 
       justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
                {filterCourse?.map((course, index) => (
                    <Card key={index} thumbnail={course.thumbnail}
                        title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews} />
                ))}
            </main>

        </div>
    )
}

export default AllCourses
