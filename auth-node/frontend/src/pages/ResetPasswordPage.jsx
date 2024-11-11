import { Lock } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Input from '../components/Input'
 
export default function ResetPasswordPage() {
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const {resetPassword,isLoading,error,message}=useAuthStore()
  const {token}=useParams()
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await resetPassword(password,confirmPassword,token)
      toast.success("password reset successfull")
      setTimeout(()=>{
        navigate('/login')
      },2000)
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>

        <form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

          <div>
            {error && <p className='text-red-600 font-semibold mb-5'>{error}</p>}
            {message && <p className='text-white font-semibold mb-5'>{message}</p>}

          </div>

					<button
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</button>
				</form>

      </div>
    </div>
  )
}
