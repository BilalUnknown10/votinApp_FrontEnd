import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import UserContext from '../store/UserContext';
import { useNavigate } from 'react-router-dom';


function Votebanner({partyName,chairman,leaderImage,partyFlag,totalVotes}) {
   
    const [voteDetail, setVoteDetail] = useState({
        name : chairman,
        partyName : partyName
    });

    const {userLogin, API_URL} = useContext(UserContext);
    
    const navigate = useNavigate();

    const poleVote = async () => {
        try {

            // if(userLogin !== true){
            //     navigate('/signin')
            // }

            const ask = confirm(`Are you sure vote for ${partyName}`)
        
        if(ask === true){

            axios.defaults.withCredentials = true;
            const response = await axios.post(`${API_URL}/voter/polevote`,voteDetail);
            alert("Vote Pole successfully");

       }else{
        alert('Choose one options of the following');
       }
        } catch (error) {
            alert(error.response.data);
        }
        
    }
    

  return (
    <div className=' bg-slate-400 ml-6 mr-6 mt-14 rounded-xl xl:w-[500px]'>
        <div className=' m-8 '>
            <div className=' font-mono sm:font-extrabold tracking-widest text-xl sm:text-3xl text-center'>
                <h1>Party Name : {partyName} </h1>
            </div>

            <div className=' flex m-6 justify-between'>
                <div className=' rounded-lg mr-6'>
                    <img className=' rounded-lg' src={leaderImage} alt="Chairman Image" />
                </div>
                <div>
                    <img className=' rounded-lg' src={partyFlag} alt="Party flag image" />
                </div>
            </div>

            <div className=' font-mono font-extrabold sm:text-3xl'>
                <h1>Chairman : {chairman}</h1>
                <p>Total Votes : {totalVotes}</p>
            </div>

            <div className=' text-right mt-8'>
                <button onClick={poleVote} className=' bg-green-200 pt-2 pb-2 pr-9  pl-9 rounded-lg font-mono sm:text-2xl 
                hover:bg-green-800 hover:text-white'>
                    Vote
                </button>
            </div>

        </div>
    </div>
  )
}

export default Votebanner
