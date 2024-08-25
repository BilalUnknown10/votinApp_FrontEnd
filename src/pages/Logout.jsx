import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext'
import axios from 'axios'

function Logout() {

  const {userLogin, setUserLogin,API_URL} = useContext(UserContext);
  


  const logOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${API_URL}/voter/logOut`)
      setUserLogin(false);
      // window.location.reload();
      
    } catch (error) {
      console.log(error.response.data);
      
    }
  }
  
      
  useEffect( () => {
    logOut()
  }, [userLogin])
    
 




  return <Navigate to={'/signin'}/>
}

export default Logout
