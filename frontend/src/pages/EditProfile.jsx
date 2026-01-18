import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import Nav from '../Component/Nav';

function EditProfile() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData.name || "")
  const [description, setDescription] = useState(userData.description || "")
  const [photoUrl, SetPhotoUrl] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      SetPhotoUrl(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      if (photoUrl) {
        formData.append("photoUrl", photoUrl)
      }

      const result = await axios.post(serverUrl + "/api/user/profile", formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/")
      toast.success("Profile Updated")
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 pt-24 flex items-center justify-center'>
      <Nav />

      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
        <FaArrowLeft className='absolute top-[5%] left-[5%] w-[22px] cursor-pointer'
          onClick={() => navigate("/profile")} />
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Edit Profile</h2>
        <form action='' className='space-y-5' onSubmit={(e) => e.preventDefault()}>
          <div className='flex flex-col items-center text-center'>
            {preview ? (
              <img src={preview}
                className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt='Preview' />
            ) : userData?.photoUrl ? (
              <img src={userData?.photoUrl}
                className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt='' />
            ) : (
              <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px]
        border-2 border-white bg-black'>
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="image" className='text-sm font-medium  text-gray-700'>Select Avatar</label>
            <input id="image" type="file"
              name='photoUrl'
              placeholder='PhotoUrl'
              accept='image/*'
              className='w-full px-4 py-2 border rounded-md text-sm'
              onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="name" className='text-sm font-medium  text-gray-700'>UserName</label>
            <input id="name" type="text"

              placeholder={userData.name}
              className='w-full px-4 py-2 border rounded-md text-sm'
              onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div>
            <label className='text-sm font-medium  text-gray-700'>Email</label>
            <input readOnly type="text"

              placeholder={userData.email}
              className='w-full px-4 py-2 border rounded-md text-sm' />
          </div>
          <div>
            <label className='text-sm font-medium  text-gray-700'>Bio</label>
            <textarea
              name='description'
              placeholder='Tell us about yourself'
              rows={3}
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none 
 focus:ring-2 focus:ring-[black]'
              onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <button className='w-full py-2  bg-[black] text-white active:bg-[#454545] 
rounded-md font-medium cursor-pointer transition' disabled={loading} onClick={handleEditProfile}>
            {loading ? <ClipLoader size={30} color='white' /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
