import React, { useState } from 'react'
import logo from '../icons/logo.webp';
import {User} from 'lucide-react'
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/AuthStore';
import { useTaskStore } from '../store/taskStore';
import CreateTaskPage from './CreateTaskPage';

export default function Header() {

  const [createPopUp,setCreatePopUp]=useState(false)

  
  const navigate=useNavigate()
  const {logout,user}=useAuthStore()

  const handleLogOut=async()=>{
    try{
      await logout()
      toast.success("logout successfull")
      navigate('/login')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='min-w-full w-full h-16 overflow-hidden bg-white flex pl-9 px-5 py-9 items-center space-x-10 '>
      {createPopUp && <CreateTaskPage setCreatePopUp={setCreatePopUp}/>}
        <img className='h-10' src={logo}/>
        <p className='text-lg font-semibold sm:block hidden'>Welcome back, {user.name} <br/>
        </p>
        <button onClick={()=>setCreatePopUp(!createPopUp)}s className='hover:opacity-70 w-50 h-10  bg-teal-400 rounded-full px-5 py-1.5 text-center text-lg font-normal text-white'>
          Add new task
        </button>
        <div className='flex flex-1 space-x-6 items-center flex-row justify-end'>
         <Link to={'https://github.com/JAYASURIYA21'}> <FaGithub className='w-7 h-7 hover:cursor-pointer hover:text-green-400'/>  </Link>
         <Link onClick={()=>window.open('/mytask/dashboard','_blank')}> <User className='hover:cursor-pointer hover:text-green-400' size={30}/> </Link>
          <button onClick={handleLogOut} className='hover:opacity-70 w-fit bg-green-400 rounded-2xl px-5 py-1.5 text-center text-lg font-semibold text-white'>Logout</button>
        
        </div>

    </div>
  )
}
