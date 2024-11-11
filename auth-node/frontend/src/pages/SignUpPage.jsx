import React, { useState } from 'react'
import Input from '../components/Input'
import {Loader, Lock, Mail, User} from 'lucide-react'
import {Link} from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengetMeter'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()

  const {signup,error,isLoading} = useAuthStore()

  const handleSignUp=async(e)=>{
    e.preventDefault()
    try{  
      await signup(email,password,name)
      navigate("/verify-email")
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-t from-green-400 to-emerald-500 text-transparent bg-clip-text'>Create Account</h2>
        <form type='submit'> 
          <Input icon={User} required type='text' placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <Input icon={Mail} required type='email' placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {error && <p className='text-red-600 font-semibold mt-2'>{error}</p>}
          <PasswordStrengthMeter password={password}/>
          <button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200 text-white font-bold rounded-lg shadow-lg focus:outline-none' onClick={handleSignUp} disabled={isLoading} type='submit'>{isLoading?<Loader className='animate-spin mx-auto' size={24}/>:"Sign Up"}</button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400 '>Already have an account?{" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>Login</Link>
        </p>
      </div>


    </div>
  )
}
