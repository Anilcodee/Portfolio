import React, { createContext, useContext, useEffect, useState } from 'react'
import { dataContext } from './UserContext';
import axios from 'axios';

export const CommentContext = createContext();
const CommentAuthContext = ({children}) => {
  const {serverUrl} = useContext(dataContext)
  const [user, setUser] = useState(null) //google user

  const loadUser = async () => {
    try {
      const {data} = await axios.get(`${serverUrl}/api/auth/me`,
        {withCredentials: true}
      )
      setUser(data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUser()
  },[])

  const value = {user, setUser}
  return (
    <CommentContext.Provider value={value}>
        {children}
    </CommentContext.Provider>
  )
}

export default CommentAuthContext