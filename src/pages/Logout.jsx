import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import axios from 'axios'

function Logout() {
  
  const {setToken} = useContext(UserContext)

  const logOut = async () => {
    try {
      
      setToken("");
      return localStorage.removeItem('token')

    } catch (error) {
      console.log(error.response.data);
      
    }
  }
  
      
  useEffect( () => {
    logOut()
  }, [logOut])
    
 




  return <Navigate to={'/signin'}/>
}

export default Logout
