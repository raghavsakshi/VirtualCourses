import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App';
import { setUserData, setAuthLoading } from '../redux/userSlice';

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getCurrentuser", { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))
            } finally {
                dispatch(setAuthLoading(false))
            }
        }
        fetchUser()
    }, [dispatch]
    )

}

export default useGetCurrentUser
