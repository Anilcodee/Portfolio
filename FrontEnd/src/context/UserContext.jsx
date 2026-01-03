import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export const dataContext = createContext()
const UserContext = ({children}) => {
  const [userData, setUserData] = useState(null)
  const serverUrl = "http://localhost:5000"
  const navigate = useNavigate()
  const getUserData = async () => {
    try {
      const {data} = await axios.get(serverUrl + "/api/admin/profile",{withCredentials:true})
      setUserData(data.admin)
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }
  const value = {
    userData, setUserData, serverUrl, getUserData
  }

  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider> 
  )
}

export default UserContext
