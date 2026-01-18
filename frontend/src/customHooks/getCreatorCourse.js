import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setcreatorCourseData } from '../redux/courseSlice'

const useCreatorCourses = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        const creatorCourses = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/course/getCreator", { withCredentials: true })
                console.log(result.data)
                dispatch(setcreatorCourseData(result.data))
               
            } catch (error) {
                console.log( error)
            }
        }
        creatorCourses()
    }, [dispatch, userData])
}

export default useCreatorCourses
