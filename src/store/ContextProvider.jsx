import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'

function ContextProvider({children}) {

    const [userLogin, setUserLogin] = useState(false);
    const [userName, setUserName] = useState('');

    const API_URL = `https://vote-app-sage.vercel.app//voter`

    const [jipCount, setJipCount] = useState('');
    const [ptiCount, setPtiCount] = useState('');
    const [pppCount, setPppCount] = useState('');
    const [anpCount, setAnpCount] = useState('');
    const [juiCount, setJuiCount] = useState('');
    const [pmlNCount, setPlmNCount] = useState('');

    const checkUserLogin = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${API_URL}/checkUserLoggedIn`);
        
        if(response.status === 200){
          setUserLogin(true)
          setUserName(response.data)
        }

      } catch (error) {
        console.log(error.response.data);
        
      }
    };

    const countVotes = async () => {
      try {
        axios.defaults.withCredentials = true
       
        setPtiCount(pti_response.data);
        const pti_response = await axios.get(`${API_URL}/voter/count/PTI`);

          setJuiCount(jui_response.data);
          const jui_response = await axios.get(`${API_URL}/voter/count/JUI`);

          setAnpCount(anp_response.data);
          const anp_response = await axios.get(`${API_URL}/voter/count/ANP`);

          setPppCount(PPP_response.data);
          const PPP_response = await axios.get(`${API_URL}/voter/count/PPP`);

          setJipCount(Jip_response.data);
          const Jip_response = await axios.get(`${API_URL}/voter/count/JIP`);

          setPlmNCount(pmlN_response.data);  
          const pmlN_response = await axios.get(`${API_URL}/voter/count/PML-N`);
          
          
      } catch (error) {
        console.log(error.response);
        
      }
    }

    
    useEffect( () => {
    countVotes()
    checkUserLogin()
  },[userLogin])



  return (
    <UserContext.Provider value={{
      userLogin, API_URL, setUserLogin, userName, ptiCount,juiCount,anpCount,jipCount,pppCount,pmlNCount
      }}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider
