import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
function CreateCourse() {
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
    const [category,setCategory]=useState("")
    const [loading,setLoading] =useState(false)
    const handleCreateCourse=async () =>{
      setLoading(true)
      try {
        const result=await axios.post(serverUrl +"/api/course/create",{title,category},{withCredentials:true})
        console.log(result.data)
        navigate("/courses")
        setLoading(false)
        toast.success(result.data.message)
      } catch (error) {
        console.log(error)
            toast.error(error?.response?.data?.message)
              setLoading(false)
      }
    }
  return (
    <div  className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='bg-white max-w-xl w-[600px] mx-auto p-6 
      shadow-md rounded-md  relative mt-10 '>
           <FaArrowLeft className='w-[22px] absolute top-[10%] left-[5%] h-[22px] cursor-pointer ' onClick={()=>navigate("/courses")}/>
    <h2 className='text-2xl  font-semibold mb-6 text-center'>Create Course</h2>
    <form className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
        <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
            <input id='title' type='text' className='w-full px-4 py-2 border border-gray-300 rounded-md 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' placeholder='Enter course Title' 
            onChange={(e)=>setTitle(e.target.value)} value={title}  ></input>
        </div>
       <div>
            <label htmlFor='cat' className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
            <select id='cat' className='w-full px-4 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]' 
             onChange={(e)=>setCategory(e.target.value)} >
              <option value="">Select Category</option>
              <option value="APP Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Web Development">Web Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="AI Tools">AI Tools</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Others">Others</option>
             </select>

        </div>
               <button className='w-full bg-[black] text-white hover:bg-[#4b4b4b] py-2 px-4
                rounded-md font-medium cursor-pointer' disabled= {loading} onClick={handleCreateCourse}>
                   {loading?<ClipLoader size ={30} color='white'/>:"Create"}
               </button>
    </form>
    </div>
    </div>
  )
}

export default CreateCourse
