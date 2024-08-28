import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'

function ContextProvider({children}) {

   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('')

    const isLoggedIn = !!token
  
    const API_URL = process.env.API_URL

    const authentication = async (jwtToken) => {
      return localStorage.setItem('token',jwtToken)
    }

    const checkUser = async () => {
      try {
      
        if(isLoggedIn){
          const response = await axios.get(`${API_URL}/voter/user`,{
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }});
          setUser(response.data);
        };
        
      } catch (error) {
        console.log(error);
        
      };
    };

 useEffect( () => {
  checkUser()
 },[user,isLoggedIn,token])

  return (
    <UserContext.Provider value={{ isLoggedIn, user, setToken,token, API_URL, authentication }}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider
