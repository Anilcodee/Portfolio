import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../context/userContext.jsx'
import { Navigate } from 'react-router-dom'
import axios from "axios"

const ProtectedRoute = ({children}) => {
  const {userData, setUserData, serverUrl} = useContext(dataContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/admin/profile`, 
                {withCredentials:true}
            )
            setUserData(data.admin)
        } catch (error) {
            setUserData(null)
        } finally {
            setLoading(false)
        }
    }

    checkAuth()
  },[])

  if(loading){
    return (
        <div className='w-full h-screen text-gray-100 flex justify-center items-center bg-linear-to-tr from-[#29323c] to-[#485563]'>
            checking authentication...
        </div>
    )
  }

  if(!userData){
    return <Navigate to="/admin/login" replace/>
  }

  return children
}

export default ProtectedRoute