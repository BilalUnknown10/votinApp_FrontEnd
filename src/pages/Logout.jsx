import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import axios from 'axios'
import {toast} from 'react-toastify'
function Logout() {
  
  const {setToken, API_URL, token} = useContext(UserContext)

  const logOut = async () => {
    try {
       
      const response = await axios.get(`${API_URL}/voter/logOut`,{
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });     
      if(response.status === 200){
        toast.success(response.data);
       setToken(""); 
      return localStorage.removeItem('token')
      }

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
