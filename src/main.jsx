import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import Logout from './pages/Logout.jsx'
import ContextProvider from './store/ContextProvider.jsx'
import UserContext from './store/UserContext.js'

const router = createBrowserRouter([
  {path : "/",       element : <Home/>},
  {path : "/signup", element : <Signup/>},
  {path : "/signIn", element : <SignIn/>},
  {path : '/logout', element : <Logout/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>

    <RouterProvider router={router}/>
     {/* <App /> */}

  </ContextProvider>
)
