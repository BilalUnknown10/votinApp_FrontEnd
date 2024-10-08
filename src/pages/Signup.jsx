import React, { useContext, useEffect, useState } from 'react'
import Input from '../components/Input.jsx'
import Label from '../components/Label.jsx'
import Navbar from '../components/Navbar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../store/UserContext.js'
import { toast } from 'react-toastify'
import '../index.css'
import { ClassNames } from '@emotion/react'

function Signup() {
  

    const [userInfo, setUerInfo] = useState({
        name : "",
        email : "",
        cardNumber : "",
        phoneNumber : "",
        password : ""
    });
    const navigate = useNavigate()

    const {API_URL, authentication} = useContext(UserContext)



    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const clasname = document.getElementById('name');
        clasname.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 sm:m-2 w-80'

        const email = document.getElementById('email');
        email.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 sm:m-2 w-80'

        const CnicNumber = document.getElementById('CnicNumber');
        CnicNumber.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 sm:m-2 w-80'

        const phone = document.getElementById('phone');
        phone.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 sm:m-2 w-80'

        const password = document.getElementById('password');
        password.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 sm:m-2 w-80'

        document.getElementById('nameError').innerHTML = "";
        document.getElementById('emailError').innerHTML = "";
        document.getElementById('cnicError').innerHTML = "";
        document.getElementById('phoneError').innerHTML = "";
        document.getElementById('passwordError').innerHTML = "";

        setUerInfo( (previosValue) => (
            {
                ...previosValue,
                [name] : value
            }
        ))
    };


    const formSubmit = async (e) => {

        e.preventDefault();

        try {   
           
            if(userInfo.name === ""){  

                const name = document.getElementById('name');
                name.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 w-80 border-red-500'
                document.getElementById('nameError').innerHTML = "name are required"

            }else if(userInfo.email === ""){

                const email = document.getElementById('email');
                email.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 w-80 border-red-500'
                document.getElementById('emailError').innerHTML = "email are required"

            }else if(userInfo.cardNumber === ""){
                const CnicNumber = document.getElementById('CnicNumber');
                CnicNumber.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 w-80 border-red-500'
                document.getElementById('cnicError').innerHTML = "cnic number are required"

            }else if(userInfo.phoneNumber === ""){

                const phone = document.getElementById('phone');
                phone.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 w-80 border-red-500'
                document.getElementById('phoneError').innerHTML = "phone number are required"

            }else if(userInfo.password === ""){

                const password = document.getElementById('password');
                password.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif m-1 w-80 border-red-500'
                document.getElementById('passwordError').innerHTML = "password are required"
                
            }else{
                axios.defaults.withCredentials = true;
                const response = await axios.post(`${API_URL}/voter/registration`, userInfo);
                
                 if(response.status === 200){

                     setUerInfo({
                         name : "",
                         email : "",
                         phoneNumber : "",
                         cardNumber : "",
                         password : ""
                        });
                        
                        toast.success(response.data.message);
                        authentication(response.data.token)
                        navigate('/');

                 }
           
            }
            
            
        } catch (error) {
            // console.log('Error from form submit function',error);
            // console.log(error)
            toast.error(error.response.data)
             
        }
       
    }

  return (
   <>
    <Navbar/>
     <div className=' w-[100%] sm:h-[100%] h-[100%] pt-8 pb-8 flex flex-col justify-center items-center '>
        <div className=' bg-slate-400 rounded-2xl sm:text-end sm:p-4 sm:ml-6 sm:mr-6 text-start sm:pr-20 mr-12 ml-12'>
           <form onSubmit={formSubmit}>
                <div className=' mt-6 mb-6 text-center'>
                    <h1 className=' font-extrabold font-mono text-xl sm:text-3xl '>Registration Form</h1>
                </div>
                <div className='md:mr-0 mt-3 mb-2 mr-6 ml-6 '>
                   <Label htmlFor={'name'} value={'Name :'}/>
                    <Input
                        type = "text" 
                        placeholder={'Enter your Name'}
                        name={'name'}
                        id={'name'}
                        value={userInfo.name}
                        onChange={handleInput}
                        className={'m-1 sm:m-2 w-80'}
                    />
                     <p className=' text-red-600 ml-6 sm:text-center sm:ml-10' id='nameError'></p>
                </div>

                <div className='sm:mr-0 sm:m-5 mt-3 mb-2 mr-6 ml-6'>
                    <Label htmlFor={'email'} value={'Email :'}/>
                    <Input
                        type = {"email"}
                        placeholder={'Email e.g example@gmail.com'}
                        name={'email'}
                        id={'email'}
                        value={userInfo.email}
                        onChange={handleInput} 
                        className={'m-1 sm:m-2 w-80'}
                    />
                    <p className=' text-red-600 ml-6 sm:text-center sm:ml-10' id='emailError'></p>
                </div>

                 <div className='sm:mr-0 sm:m-5 mt-3 mb-2 mr-6 ml-6'>
                    <Label htmlFor={'CnicNumber'} value={'CNIC Number :'}/>
                    <Input
                        type = "number"
                        placeholder={'CNIC e.g 15101xxxxxxx'}
                        name={'cardNumber'}
                        id={'CnicNumber'}
                        value={userInfo.cardNumber}
                        onChange={handleInput} 
                        className={'m-1 sm:m-2 w-80'}
                    />
                     <p className=' text-red-600 ml-6 sm:text-center sm:ml-20' id='cnicError'></p>
                </div>
                 <div className='sm:mr-0 sm:m-5 mt-3 mb-2 mr-6 ml-6'>
                    <Label htmlFor={'phone'} value={'Phone Number :'}/>
                    <Input
                        type = "number"
                        placeholder={'Phone e.g 0340xxxxxxx'}
                        name={'phoneNumber'}
                        id={'phone'}
                        value={userInfo.phoneNumber}
                        onChange={handleInput} 
                        className={'m-1 sm:m-2 w-80'}
                    />
                    <p className=' text-red-600 sm:ml-24 ml-6 sm:text-center' id='phoneError'></p>
                </div>
                 <div className='sm:mr-0 sm:m-5 mt-3 mb-2 mr-6 ml-6'>
                    <Label htmlFor={'password'} value={'Password :'}/>
                    <Input
                        type = "password"
                        placeholder={'Enter your Password'}
                        name={'password'}
                        id={'password'}
                        value={userInfo.password}
                        onChange={handleInput} 
                        className={'m-1 sm:m-2 w-80'}
                    />
                    <p className=' text-red-600 ml-6 sm:text-center sm:ml-20' id='passwordError'></p>
                </div>
                <div className='p-5 text-end'>
                    <button type='submit' className=' tracking-widest pr-10 pl-10 pt-3 pb-3 rounded-2xl sm:font-extrabold sm:text-xl hover:text-white hover:bg-green-700 bg-blue-700 font-mono'>
                    submit
                    </button>
                </div>
           </form>
        </div>
    </div>
   </>
  )
}

export default Signup
