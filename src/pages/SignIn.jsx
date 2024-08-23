import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Label from '../components/Label.jsx'
import Input from '../components/Input.jsx'
import axios from 'axios';
import UserContext from '../store/UserContext.js';
import { useNavigate } from 'react-router-dom';

function SignIn() {

      const [userInfo, setUerInfo] = useState({
        cardNumber : "",
        password : ""
    });
    
    const navigate = useNavigate()

    const {setUserLogin,userLogin, API_URL} = useContext(UserContext)


     const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        document.getElementById('cnicError').innerHTML = "";
        document.getElementById('passwordError').innerHTML =  "";

        setUerInfo( (previosValue) => (
            {
                ...previosValue,
                [name] : value
            }
        ));
    };

      const formSubmit = async (e) => {

        e.preventDefault();

        try {

            if(userInfo.cardNumber === ""){
                document.getElementById('cnicError').innerHTML = 'Cnic number required';
            }else if(userInfo.password === ""){
                document.getElementById('passwordError').innerHTML = 'password required'
            }else{

                const response = await axios.post(`${API_URL}/voter/login`,userInfo);

                if(response.status === 200){

                    setUerInfo({
                        cardNumber : "",
                        password : ""
                    });

                    alert('User logged in successfully');
                    setUserLogin(true);
                    navigate('/');
                    window.location.reload()

                };
            };
            
        } catch (error) {
            // console.log('Error from form submit function',error);
            alert(error.response.data)
            
        };
    };

  return (
   <>
    <Navbar/>
     <div className=' w-[100%] h-[100%] pt-16 pb-16  flex flex-col justify-center items-center'>
        <div className=' bg-slate-400 rounded-2xl sm:text-end sm:p-4 sm:ml-6 sm:mr-6 text-start mr-7 ml-7 pl-7 '>
           <form onSubmit={formSubmit}>
                <div className=' mt-6 mb-6 text-center'>
                    <h1 className=' font-extrabold font-mono text-2xl sm:text-3xl '>Login Form</h1>
                </div>
               
                 <div>
                    <Label htmlFor={'CnicNumber'} value={'CNIC Number :'}/>
                    <Input
                        type = "number"
                        placeholder={'CNIC e.g 15101xxxxxxx'}
                        name={'cardNumber'}
                        id={'CnicNumber'}
                        value={userInfo.cardNumber}
                        onChange={handleInput} 
                        className={'m-4 w-80'}
                    />
                    <p className=' text-red-500 text-center' id='cnicError'></p>
                </div>
                 <div>
                    <Label htmlFor={'password'} value={'Password :'}/>
                    <Input
                        type = "password"
                        placeholder={'Enter your Password'}
                        name={'password'}
                        id={'password'}
                        value={userInfo.password}
                        onChange={handleInput} 
                        className={'m-4 w-80'}
                    />
                    <p className=' text-red-500 text-center' id='passwordError'></p>
                </div>
                <div className='p-5 text-end'>
                    <button type='submit' className=' tracking-widest pr-10 pl-10 pt-3 pb-3 rounded-2xl sm:font-extrabold sm:text-xl hover:text-white hover:bg-green-700 bg-blue-700 font-mono'>
                        sign-In
                    </button>
                </div>
           </form>
        </div>
    </div>
   </>
  )
}

export default SignIn
