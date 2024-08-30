import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Label from '../components/Label.jsx'
import Input from '../components/Input.jsx'
import axios from 'axios';
import UserContext from '../store/UserContext.js';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function SignIn() {

      const [userInfo, setUerInfo] = useState({
        cardNumber : "",
        password : ""
    });
    
    const navigate = useNavigate()

    const {API_URL, authentication, loading, setLoading} = useContext(UserContext)
  

     const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const CnicNumber = document.getElementById('CnicNumber');
        CnicNumber.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif mt-1 mb-4 w-80'

        const password = document.getElementById('password');
        password.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif mt-1 mb-4 w-80'



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
                
                const CnicNumber = document.getElementById('CnicNumber');
                CnicNumber.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif mt-1 mb-4 w-80 border-red-500'
                document.getElementById('cnicError').innerHTML = 'Cnic number required';

            }else if(userInfo.password === ""){

                const password = document.getElementById('password');
                password.className = 'outline-none border p-3 rounded-lg bg-zinc-100 font-serif mt-1 mb-4 w-80 border-red-500'
                document.getElementById('passwordError').innerHTML = 'password required'

            }else{

                setLoading(false)
                const response = await axios.post(`${API_URL}/voter/login`,userInfo);
                 console.log(response)
                if(response.status === 200){

                    setLoading(true)
                    
                    setUerInfo({
                        cardNumber : "",
                        password : ""
                    });
                    
                    toast.success(response.data.message);
                    authentication(response.data.token);
                    navigate('/');
                }
            };
            
        } catch (error) {
            setLoading(true)
            toast.error(error.response.data);
        };
    };

  return (
   <>
    <Navbar/>
    {loading ? 
     <div className=' w-[100%] h-[100%] pt-16 pb-16  flex flex-col justify-center items-center'>
        <div className=' bg-slate-400 rounded-2xl sm:text-end sm:p-4 sm:ml-6 sm:mr-6 text-start mr-7 ml-7 pl-5'>
           <form onSubmit={formSubmit}>
                <div className=' mt-6 mb-6 text-center'>
                    <h1 className=' font-extrabold font-mono text-2xl sm:text-3xl '>Login Form</h1>
                </div>
               
                 <div className=' mt-4'>
                    <Label htmlFor={'CnicNumber'} value={'CNIC Number :'}/>
                    <Input
                        type = "number"
                        placeholder={'CNIC e.g 15101xxxxxxx'}
                        name={'cardNumber'}
                        id={'CnicNumber'}
                        value={userInfo.cardNumber}
                        onChange={handleInput} 
                        className={'mt-1 mb-4 w-80'}
                    />
                    <p className=' text-red-600 ml-1 sm:text-center sm:ml-16' id='cnicError'></p>
                </div>
                 <div className=' mt-4'>
                    <Label htmlFor={'password'} value={'Password :'}/>
                    <Input
                        type = "password"
                        placeholder={'Enter your Password'}
                        name={'password'}
                        id={'password'}
                        value={userInfo.password}
                        onChange={handleInput} 
                        className={'mt-1 mb-4 w-80'}
                    />
                    <p className=' text-red-600 ml-1 sm:ml-10 sm:text-center' id='passwordError'></p>
                </div>
                <div className='p-5 text-end'>
                    <button type='submit' className=' tracking-widest pr-5 pl-5 sm:pr-10 sm:pl-10 pt-3 pb-3 rounded-2xl sm:font-extrabold sm:text-xl text-white hover:bg-green-700 bg-blue-700 font-mono'>
                        sign-In
                    </button>
                </div>
           </form>
        </div>
    </div> : <> 
        <div className=' w-[100vw] h-[70vh] sm:h-[90vh] flex justify-center items-center'>
            <h1 className=' font-mono font-extrabold text-3xl main '>
            loading..
            </h1>
        </div>
    </>
    }

   </>
  )
}

export default SignIn
