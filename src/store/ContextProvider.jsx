import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'

function ContextProvider({children}) {

   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')

    const isLoggedIn = !!token
  
    const API_URL = "https://vote-app-dun.vercel.app"

    const authentication = async (jwtToken) => {
      setToken(jwtToken)
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

          if(response.status === 200){
            setUser(response.data);
          }else{
            console.log(loading)
          }
        };
        
      } catch (error) {
        console.log(error);
        
      };
    };

 useEffect( () => {
  checkUser()
 },[user,isLoggedIn,token])

  return (
    <UserContext.Provider value={{ isLoggedIn, loading, setLoading, user, setToken,token, API_URL, authentication }}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider
