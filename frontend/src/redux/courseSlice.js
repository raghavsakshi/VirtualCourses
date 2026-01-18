import { createSlice } from "@reduxjs/toolkit"

const courseSlice = createSlice({
  name :"course",
  initialState :{
    createCourseData :null,
selectedCourse:null,
    courseData:null
  },
  reducers :{
    setcreatorCourseData :(state,action)=>{
      state.creatorCourseData = action.payload
    },

    setCourseData :(state,action)=>{
      state.courseData = action.payload
    },
    setSelectedCourse:(state,action)=>{
      state.selectedCourse = action.payload
    }
  
}})
export const  {setcreatorCourseData,setCourseData,setSelectedCourse} =courseSlice.actions
export default courseSlice.reducer
