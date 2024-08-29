import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import UserContext from '../store/UserContext';




function Navbar() {
  const [show, setShow] = useState(true);

  const {isLoggedIn,user} = useContext(UserContext);

 


  const showNavbar = () => {
    const doc = document.getElementById('nav')
      if(show){
        setShow(false)
        doc.classList.remove('hidden');
      }else{
        setShow(true)
        doc.classList.add('hidden');
      }
      
  }

  return (
    <div className=' bg-green-800 p-6 text-white'>
      <div className=' sm:text-2xl font-semibold tracking-widest flex justify-between'>
        <div>
            {isLoggedIn ? <h1>{user}</h1> : <h1>Voting Application</h1>}
        </div>
        
       <div className=' text-end'>

        <div className=' sm:hidden mb-6' onClick={showNavbar}>
        <DensityMediumIcon/>
        </div>

         <div id='nav' className=' sm:flex hidden'>

            <li className=' mr-6 list-none'>
              <Link to={'/'}>Home</Link>
            </li>

            {isLoggedIn ?

             <li className=' mr-6 list-none'>
              <Link to={'/logout'}>LogOut</Link>
            </li> 
            
            : <>

              <li className=' mr-6 list-none'>
              <Link to={'/signup'}>Sign-up</Link>
            </li>

            <li className=' mr-6 list-none'>
              <Link to={'/signIn'}>Sign-in</Link>
            </li>
            
            </> }           

        </div>
        </div> 
        
      </div>
    </div>
  )
}

export default Navbar
