import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import axios from 'axios'
import {toast} from 'react-toastify'
function Logout() {
  
  const {setToken, API_URL, token, setLoading, loading} = useContext(UserContext)

  const logOut = async () => {
    try {
       setLoading(false)
      const response = await axios.get(`${API_URL}/voter/logOut`,{
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });     
      if(response.status === 200){
        setLoading(true)
        toast.success(response.data);
        setToken(""); 
        return localStorage.removeItem('token')
      }

    } catch (error) {
      setLoading(true)
      console.log(error.response.data);
      
    }
  }
  
      
  useEffect( () => {
    logOut()
  }, [logOut])
    
 




  return <>
    {loading ? <Navigate to={'/signin'}/> : <><Navigate to={'/login'}/></>}
  </>
}

export default Logout
