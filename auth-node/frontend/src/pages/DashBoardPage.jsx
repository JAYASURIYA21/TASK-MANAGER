import React from 'react'
import { useAuthStore } from '../store/AuthStore'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { formatDate } from '../utils/data'

export default function DashBoardPage() {
  const {user,logout,error,isLoading}=useAuthStore()

  const handleLogOut=async()=>{
    try{
      await logout()
      toast.success("user logged out")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'>
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>Dashboard</h2>
      <div className='space-y-6'>

        <div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
          <h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
          <p className='text-gray-300'><span className='font-bold'> Name : </span>{user.name}</p>
          <p className='text-gray-300'><span className='font-bold'>Email : </span>{user.email}</p>
        </div>

        <div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
          <h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
          <p className='text-gray-300'>
						<span className='font-bold'>Joined : </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
          <p className='text-gray-300'>
						<span className='font-bold'>Last Login : </span>

						{formatDate(user.lastLogin)}
					</p>
        </div>


        <button className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900' onClick={handleLogOut}>{isLoading?<Loader className='w-6 h-6 animate-spin mx-auto'/>:"Logout"}</button>

      </div>
      
    </div>
  )
}
