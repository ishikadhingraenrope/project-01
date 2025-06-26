import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/home/Home'
import About from './components/about/About.jsx'
import Service from './components/services/Service'
import Contact from './components/contact/Contact'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import App from './App.jsx'
import {RouterProvider} from "react-router-dom"
import  { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

const router  = createBrowserRouter (
createRoutesFromElements(
<Route path='/' element={<App/>}>
<Route path='/' element={<Home />} />
<Route path='about' element={<About/>}/>
<Route path='service' element={<Service/>}/>

<Route path='contact' element={<Contact/>}/>
<Route path='login' element={<Login/>}/>
<Route path='signup' element={<Signup/>}/>


</Route>


));

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>

  </StrictMode>,
)
