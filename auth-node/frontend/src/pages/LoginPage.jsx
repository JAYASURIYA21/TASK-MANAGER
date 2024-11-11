import React, { useState } from 'react'
import Input from '../components/Input'
import {User,Lock, Loader} from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore'

export default function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {isLoading,error,login}=useAuthStore()

  const handleSubmit=async(e)=>{
    e.preventDefault()
      try{
        await login(email,password)
      }catch(err){
        console.log(err,"error from login");
      }
  } 

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Welcome back</h2>
          <form >
            <Input icon={User} required type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div>
            {error && <p className='text-red-600 font-semibold mb-5'>{error}</p>}
            </div>
            <div className='flex items-center mb-6'>
  					<Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
							Forgot password?
						</Link>
            
					</div>
          <button className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200 text-white font-bold rounded-lg shadow-lg focus:outline-none' type='submit' onClick={handleSubmit}>{isLoading?<Loader className='h-6 w-6 mx-auto animate-spin'/>:"Login"}</button>
          </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400 '>Don't have an account?{" "}
          <Link to={"/signup"} className='text-green-400 hover:underline'>Signup</Link>
        </p>
      </div>

    </div>
  )
}
