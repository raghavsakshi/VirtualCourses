import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../../assets/empty.jpg'
import { serverUrl } from '../../App';

import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';
function EditCourses() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [isPublished, setisPublished] = useState(false)
  const [selectCourse, setSelectCourse] = useState(null)
  const thumb = useRef()
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [backendImage, setBackendImage] = useState(null)
  const [frontendImage, setFrontendImage] = useState(img)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.user)
  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const getCourseById = useCallback(async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getCourse/${courseId}`, { withCredentials: true })
      setSelectCourse(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }, [courseId])
  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subtitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setTitle(selectCourse.title || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price || "")
      setFrontendImage(selectCourse.thumbnail || img)
      setisPublished(selectCourse?.isPublished)

    }
  }, [selectCourse])

  useEffect(() => {
    getCourseById()
  }, [getCourseById])

  const handleEditCourse = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("thumbnail", backendImage)
    formData.append("isPublished", isPublished)
    try {
      const result = await axios.post(serverUrl + `/api/course/editCourse/${courseId}`, formData, { withCredentials: true })
      console.log(result.data)
      const updateData = result.data
      if (updateData.isPublished) {
        const updateCourse = courseData.map(c => c._id === courseId ? updateData : c)
        if (!courseData.some(c => c._id === courseId)) {
          updateCourse.push(updateData)
        }
        dispatch(setCourseData(updateCourse))

      }
      else {
        const filterCourse = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourse))
      }

      setLoading(false)
      navigate("/courses")
      toast.success(result.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleRemoveCourse = async () => {
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`,
        { withCredentials: true })
      console.log(result.data)
      const filterCourse = courseData.filter(c => c._id !== courseId)
      dispatch(setCourseData(filterCourse))
      navigate("/courses")
      toast.success(result.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white 
    rounded-lg shadow-md'>
      {/* top  bar */}
      <div className='flex items-center justify-center gap-[20px] 
      md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeft className='top-[-20%] md:top-[20%] absolute left-[0]
         md:left-[2%] w-[22px] h-[22px]' onClick={() => navigate("/courses")} />
        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add Detail Information regarding the Course</h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded-md' onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}>Go to Lecture Page</button>
        </div>
      </div>
      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1'
            onClick={() => setisPublished(prev => !prev)}>
            Click to Publish
          </button> : <button classname='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1'
            onClick={() => setisPublished(prev => !prev)}>
            Click to UnPublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md ' onClick={handleRemoveCourse}>Remove Courses</button>
        </div>
        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input id='title' type="text" className='w-full border px-4 py-2 rounded-md'
              placeholder='Course Title' onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input id='subtitle' type="text" className='w-full border px-4 py-2 rounded-md'
              placeholder='Course SubTitle' onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
          </div>
          <div>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea id='description' type="text" className='w-full border px-4 py-2 rounded-md h-24 resize-none'
              placeholder='Course Description' onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input id='title' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='CourseTitle' />
          </div>
          <div className='flex flex-col sm:flex-row sm:space-x-4
          space-y-4 sm:space-y-0'>
            {/* for category */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white'
                onChange={(e) => setCategory(e.target.value)} value={category}>
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
            {/* for label */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white'
                onChange={(e) => setLevel(e.target.value)} value={level}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>

              </select>
            </div>
            {/* for prize */}
            <div className='flex-1'>
              <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1' >Course Prize (INR)</label>
              <input type="number" name='' id='price' className='w-full px-4 py-2 rounded-md ' placeholder='₹'
                onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>

          </div>
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
              Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail} />
          </div>

          <div className='relative w-[300px] border-1  border-[black] h-[300px]'>
            <img src={frontendImage} alt="" classname='w-[100%] h-[100%]  rounded-[5px]'
              onClick={() => thumb.current.click()} />
            < FaEdit className='w-[20px] h-[20px] absolute top-2 right-2'
              onClick={() => thumb.current.click()} />
          </div>
          <div className='flex items-center justify-start gap-[15px]'>
            <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4
              py-2 rounded-md' onClick={() => navigate("/courses")}>Cancel</button>
            <button className='bg-black text-white px-7 py-2 
              rounded-md hover:bg-gray-500 cursor-pointer'disabled={loading}
              onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color='white' /> : "Save"}</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditCourses
