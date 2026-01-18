import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'
import axios from 'axios'


const useGetAllReview = () => {
    const dispatch =useDispatch()
  useEffect(()=>{
const allReview =async () =>{
    try {
        const result =await axios.get(serverUrl+ "/api/review/getreview",{withCredentials:true})
     dispatch(setReviewData(result.data))
     console.log(result.data)
    } catch (error) {
        console.log(error)
    }
}
allReview()
  },[dispatch])
}

export default useGetAllReview
