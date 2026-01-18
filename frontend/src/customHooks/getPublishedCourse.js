import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { setCourseData } from '../redux/courseSlice'
import { useDispatch } from 'react-redux'

const usePublishedCourses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCourseData = async () => {
            console.log('usePublishedCourses - Starting to fetch published courses')
            try {
                const result = await axios.get(serverUrl + "/api/course/getPublished", { withCredentials: true })
                console.log('usePublishedCourses - API response:', result.data)
                dispatch(setCourseData(result.data))
                console.log('usePublishedCourses - Dispatched to Redux:', result.data)
            } catch (error) {
                console.log('usePublishedCourses - Error fetching courses:', error)
            }
        }
        getCourseData()
    }, [dispatch])
}

export default usePublishedCourses
